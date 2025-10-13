import { GoogleGenerativeAI } from '@google/generative-ai';

// Gemini AI configuration
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY!;

if (!apiKey) {
  throw new Error('Missing Gemini API key. Please check your .env file.');
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(apiKey);

// Get the generative model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Story generation configuration
const storyGenerationConfig = {
  temperature: 0.8,
  maxOutputTokens: 1000,
  topP: 0.8,
  topK: 40,
};

export interface StoryRequest {
  words: string[];
  language: 'bangla' | 'english';
  childAge?: number;
  storyLength?: 'short' | 'medium' | 'long';
  theme?: 'adventure' | 'friendship' | 'learning' | 'fun';
}

export interface StoryResponse {
  title: string;
  content: string;
  moral?: string;
  vocabulary?: string[];
  questions?: string[];
}

export const geminiService = {
  // Generate story based on selected words
  generateStory: async (request: StoryRequest): Promise<StoryResponse> => {
    try {
      const { words, language, childAge = 6, storyLength = 'medium', theme = 'fun' } = request;
      
      const languageInstruction = language === 'bangla' 
        ? 'Write the story in Bengali (Bangla) language. Use simple Bengali words appropriate for children.'
        : 'Write the story in English language. Use simple English words appropriate for children.';

      const lengthInstruction = {
        short: 'Keep the story short (3-4 sentences)',
        medium: 'Keep the story medium length (6-8 sentences)',
        long: 'Make the story longer (10-12 sentences)'
      }[storyLength];

      const prompt = `
        Create a children's story for a ${childAge}-year-old child with the following requirements:
        
        ${languageInstruction}
        
        Required words to include: ${words.join(', ')}
        
        Story theme: ${theme}
        ${lengthInstruction}
        
        Make the story:
        - Age-appropriate and educational
        - Fun and engaging
        - Include simple vocabulary
        - Have a positive message or moral lesson
        - Be suitable for reading aloud
        
        Please provide:
        1. A catchy title
        2. The story content
        3. A simple moral lesson (optional)
        4. 3-5 new vocabulary words from the story
        5. 2-3 simple questions about the story
        
        Format your response as JSON:
        {
          "title": "Story Title",
          "content": "Story content here...",
          "moral": "Simple moral lesson",
          "vocabulary": ["word1", "word2", "word3"],
          "questions": ["Question 1?", "Question 2?"]
        }
      `;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: storyGenerationConfig,
      });

      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      try {
        const parsedResponse = JSON.parse(text);
        return parsedResponse;
      } catch (parseError) {
        // If JSON parsing fails, return a structured response
        return {
          title: `Story with ${words.join(', ')}`,
          content: text,
          moral: 'Learning new words is fun!',
          vocabulary: words,
          questions: ['What was your favorite part of the story?', 'Can you tell me what happened?']
        };
      }
    } catch (error) {
      console.error('Error generating story:', error);
      throw new Error('Failed to generate story. Please try again.');
    }
  },

  // Generate learning content explanations
  generateExplanation: async (topic: string, language: 'bangla' | 'english', childAge: number = 6): Promise<string> => {
    try {
      const languageInstruction = language === 'bangla' 
        ? 'Explain in simple Bengali (Bangla)'
        : 'Explain in simple English';

      const prompt = `
        Explain "${topic}" for a ${childAge}-year-old child.
        
        ${languageInstruction}
        
        Make it:
        - Simple and easy to understand
        - Fun and engaging
        - Age-appropriate
        - Short (2-3 sentences)
        - Use examples children can relate to
      `;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
          topP: 0.8,
          topK: 40,
        },
      });

      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating explanation:', error);
      return `Let's learn about ${topic} together!`;
    }
  },

  // Generate math word problems
  generateMathProblem: async (operation: 'addition' | 'subtraction' | 'multiplication' | 'division', difficulty: 'easy' | 'medium' | 'hard', language: 'bangla' | 'english' = 'english'): Promise<string> => {
    try {
      const languageInstruction = language === 'bangla' 
        ? 'Write the problem in Bengali (Bangla)'
        : 'Write the problem in English';

      const difficultyNumbers = {
        easy: 'numbers 1-10',
        medium: 'numbers 1-20',
        hard: 'numbers 1-50'
      };

      const prompt = `
        Create a simple ${operation} word problem for children.
        
        ${languageInstruction}
        
        Requirements:
        - Use ${difficultyNumbers[difficulty]}
        - Make it relatable to children (toys, animals, food, etc.)
        - Keep it simple and clear
        - One sentence problem
        - Age-appropriate language
        
        Example format: "Sarah has 5 apples. She gets 3 more apples. How many apples does she have now?"
      `;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
          topP: 0.8,
          topK: 40,
        },
      });

      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating math problem:', error);
      return `Let's practice ${operation}!`;
    }
  },

  // Generate positive feedback messages
  generateEncouragement: async (achievement: string, language: 'bangla' | 'english' = 'english'): Promise<string> => {
    try {
      const languageInstruction = language === 'bangla' 
        ? 'Write in Bengali (Bangla)'
        : 'Write in English';

      const prompt = `
        Generate an encouraging message for a child who just achieved: "${achievement}"
        
        ${languageInstruction}
        
        Make it:
        - Positive and encouraging
        - Age-appropriate (5-8 years old)
        - Short (1-2 sentences)
        - Fun and exciting
        - Include celebration words
      `;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 50,
          topP: 0.8,
          topK: 40,
        },
      });

      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating encouragement:', error);
      return language === 'bangla' ? 'ভালো কাজ! (Great job!)' : 'Great job! Keep it up!';
    }
  },
};

export default geminiService;
