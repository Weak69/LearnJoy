import * as Speech from 'expo-speech';
// Audio session configuration is optional for TTS; to avoid deprecated expo-av,
// we keep this module self-contained without external audio deps.

// Text-to-Speech configuration
interface TTSConfig {
  language: string;
  pitch: number;
  rate: number;
  volume: number;
}

// Default TTS configurations for different languages
const defaultConfigs: Record<string, TTSConfig> = {
  en: {
    language: 'en-US',
    pitch: 1.2, // Higher pitch for child-friendly voice
    rate: 0.8,  // Slower rate for clarity
    volume: 0.8,
  },
  bn: {
    // Some Android devices might not have bn-BD; we'll try to pick a voice dynamically
    language: 'bn-BD', // Bengali (Bangladesh)
    pitch: 1.1,
    rate: 0.7,  // Slower for non-native speakers
    volume: 0.8,
  },
};

export interface SpeechOptions {
  language?: 'bangla' | 'english';
  pitch?: number;
  rate?: number;
  volume?: number;
  onStart?: () => void;
  onDone?: () => void;
  onError?: (error: any) => void;
}

// Cache available voices to choose best match per language
let voicesCache: Speech.Voice[] | null = null;
let voicesLogged = false;

async function loadVoicesOnce(): Promise<Speech.Voice[] | null> {
  try {
    if (!voicesCache) {
      voicesCache = await Speech.getAvailableVoicesAsync();
      if (!voicesLogged) {
        console.log('Available TTS voices:', voicesCache);
        voicesLogged = true;
      }
    }
    return voicesCache;
  } catch (e) {
    console.warn('Unable to fetch TTS voices:', e);
    return null;
  }
}

function pickVoiceForLanguage(allVoices: Speech.Voice[] | null, lang: 'bangla' | 'english'): Speech.Voice | undefined {
  if (!allVoices) return undefined;
  const targets = lang === 'bangla'
    ? ['bn-BD', 'bn_IN', 'bn-IN', 'bn']
    : ['en-US', 'en_GB', 'en-GB', 'en'];
  for (const t of targets) {
    const v = allVoices.find((voice) => voice.language?.toLowerCase().startsWith(t.toLowerCase()));
    if (v) return v;
  }
  // Last resort: any voice starting with the base language code
  const base = lang === 'bangla' ? 'bn' : 'en';
  return allVoices.find((v) => v.language?.toLowerCase().startsWith(base));
}

export const configureAudioMode = async (): Promise<void> => {
  // No-op: If you adopt expo-audio in the future, you can configure audio here.
  return;
};

export const speechService = {
  // Speak text using TTS
  speak: async (text: string, options: SpeechOptions = {}): Promise<void> => {
    try {
      const {
        language = 'english',
        pitch,
        rate,
        volume,
        onStart,
        onDone,
        onError
      } = options;

      const config = defaultConfigs[language === 'bangla' ? 'bn' : 'en'];

      // Ensure voices/audio mode are available
      await configureAudioMode();
      const voices = await loadVoicesOnce();
      const pickedVoice = pickVoiceForLanguage(voices, language);
  console.log('Picked TTS voice:', pickedVoice);

      const baseOptions: Speech.SpeechOptions = {
        language: pickedVoice?.language ?? config.language,
        voice: pickedVoice?.identifier,
        pitch: pitch ?? config.pitch,
        rate: rate ?? config.rate,
        volume: volume ?? config.volume,
        onStart,
        onDone,
      };

      // Attach a resilient onError that retries without voice/language constraints
      const resilientOnError = (error: any) => {
        console.warn('TTS error (first attempt):', error);
        // Retry with minimal options to let the engine choose defaults
        try {
          Speech.speak(text, {
            pitch: pitch ?? config.pitch,
            rate: rate ?? config.rate,
            volume: volume ?? config.volume,
            onStart,
            onDone,
            onError,
          });
        } catch (e) {
          console.error('TTS retry failed:', e);
          onError?.(e as any);
        }
      };

      Speech.speak(text, { ...baseOptions, onError: resilientOnError });
    } catch (error) {
      console.error('Speech error:', error);
      throw new Error('Failed to speak text');
    }
  },

  // Stop current speech
  stop: async (): Promise<void> => {
    try {
      await Speech.stop();
    } catch (error) {
      console.error('Stop speech error:', error);
    }
  },

  // Check if currently speaking
 isSpeaking: async (): Promise<boolean> => {
  return await Speech.isSpeakingAsync();
},

  // Speak letter with pronunciation
  speakLetter: async (letter: string, language: 'bangla' | 'english' = 'english'): Promise<void> => {
    // Stop any ongoing TTS and speak once to avoid duplicates
    try {
      const speaking = await Speech.isSpeakingAsync();
      if (speaking) {
        await Speech.stop();
      }
    } catch {}
    await speechService.speak(letter, { language });
  },

  // Speak word with pronunciation
  speakWord: async (word: string, language: 'bangla' | 'english' = 'english'): Promise<void> => {
    await speechService.speak(word, { language });
  },

  // Speak number
  speakNumber: async (number: number, language: 'bangla' | 'english' = 'english'): Promise<void> => {
    const numberText = number.toString();
    await speechService.speak(numberText, { language });
  },

  // Speak math problem
  speakMathProblem: async (problem: string, language: 'bangla' | 'english' = 'english'): Promise<void> => {
    // Clean up the problem text for better pronunciation
    const cleanProblem = problem
      .replace(/\+/g, ' plus ')
      .replace(/-/g, ' minus ')
      .replace(/\*/g, ' times ')
      .replace(/\//g, ' divided by ')
      .replace(/=/g, ' equals ');

    await speechService.speak(cleanProblem, { language });
  },

  // Speak encouragement messages
  speakEncouragement: async (message: string, language: 'bangla' | 'english' = 'english'): Promise<void> => {
    await speechService.speak(message, { 
      language,
      pitch: 1.3, // Higher pitch for excitement
      rate: 0.9,
    });
  },

  // Speak story with pauses
  speakStory: async (story: string, language: 'bangla' | 'english' = 'english'): Promise<void> => {
    // Split story into sentences for better pacing
    const sentences = story.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim();
      if (sentence.length > 0) {
        await speechService.speak(sentence, { 
          language,
          rate: 0.7, // Slower for storytelling
        });
        
        // Add pause between sentences (except for the last one)
        if (i < sentences.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
  },
};

// Speech-to-Text service (placeholder for future implementation)
export const speechToTextService = {
  // This would integrate with Google Speech-to-Text API
  // For now, we'll create a placeholder structure
  
  startListening: async (language: 'bangla' | 'english' = 'english'): Promise<void> => {
    // TODO: Implement speech-to-text functionality
    console.log('Speech-to-text not yet implemented');
    throw new Error('Speech-to-text not yet implemented');
  },

  stopListening: async (): Promise<string> => {
    // TODO: Return recognized text
    throw new Error('Speech-to-text not yet implemented');
  },

  // Check pronunciation accuracy (basic implementation)
  checkPronunciation: (spoken: string, correct: string): boolean => {
    // Simple string comparison (in real implementation, would use phonetic matching)
    const normalize = (text: string) => text.toLowerCase().trim();
    return normalize(spoken) === normalize(correct);
  },
};

// Audio feedback service
export const audioService = {
  // Play sound effects
  playSound: async (soundType: 'correct' | 'incorrect' | 'tap' | 'celebration'): Promise<void> => {
    try {
      // This would play pre-recorded sound files
      // For now, we'll use TTS to provide audio feedback
      const sounds = {
        correct: 'Great job!',
        incorrect: 'Try again!',
        tap: '',
        celebration: 'Congratulations!',
      };

      const soundText = sounds[soundType];
      if (soundText) {
        await speechService.speak(soundText, { 
          pitch: soundType === 'correct' || soundType === 'celebration' ? 1.4 : 1.0,
          rate: 0.9,
        });
      }
    } catch (error) {
      console.error('Audio feedback error:', error);
    }
  },

  // Play background music
  playBackgroundMusic: async (musicType: 'learning' | 'math' | 'story'): Promise<void> => {
    try {
      // This would play background music files
      console.log(`Playing background music: ${musicType}`);
      // TODO: Implement background music playback
    } catch (error) {
      console.error('Background music error:', error);
    }
  },

  // Stop background music
  stopBackgroundMusic: async (): Promise<void> => {
    try {
      // TODO: Stop background music
      console.log('Stopping background music');
    } catch (error) {
      console.error('Stop background music error:', error);
    }
  },
};

export default speechService;
