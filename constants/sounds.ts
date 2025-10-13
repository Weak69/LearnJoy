export const sounds = {
  // Success sounds
  success: {
    correct: 'correct_answer.mp3',
    completion: 'level_complete.mp3',
    achievement: 'achievement_unlocked.mp3',
    celebration: 'celebration.mp3',
  },
  
  // Error sounds
  error: {
    incorrect: 'incorrect_answer.mp3',
    tryAgain: 'try_again.mp3',
    error: 'error_sound.mp3',
  },
  
  // Interaction sounds
  interaction: {
    tap: 'tap_sound.mp3',
    buttonPress: 'button_press.mp3',
    swipe: 'swipe_sound.mp3',
    selection: 'selection_sound.mp3',
  },
  
  // Learning sounds
  learning: {
    letterSound: 'letter_sound.mp3',
    wordSound: 'word_sound.mp3',
    numberSound: 'number_sound.mp3',
    questionSound: 'question_sound.mp3',
  },
  
  // Background music
  background: {
    mainTheme: 'main_theme.mp3',
    learningMode: 'learning_music.mp3',
    mathMode: 'math_music.mp3',
    storyMode: 'story_music.mp3',
  },
  
  // Voice prompts
  voice: {
    welcome: 'welcome_message.mp3',
    instructions: 'instructions.mp3',
    encouragement: 'encouragement.mp3',
    congratulations: 'congratulations.mp3',
  },
};

// Sound categories for volume control
export const soundCategories = {
  effects: ['success', 'error', 'interaction', 'learning'],
  music: ['background'],
  voice: ['voice'],
};

// Default volume levels (0.0 to 1.0)
export const defaultVolumes = {
  effects: 0.7,
  music: 0.3,
  voice: 0.8,
};

// Sound file paths
export const soundPaths = {
  // Success sounds
  correct: require('../assets/sounds/success/correct_answer.mp3'),
  completion: require('../assets/sounds/success/level_complete.mp3'),
  achievement: require('../assets/sounds/success/achievement_unlocked.mp3'),
  celebration: require('../assets/sounds/success/celebration.mp3'),
  
  // Error sounds
  incorrect: require('../assets/sounds/error/incorrect_answer.mp3'),
  tryAgain: require('../assets/sounds/error/try_again.mp3'),
  error: require('../assets/sounds/error/error_sound.mp3'),
  
  // Interaction sounds
  tap: require('../assets/sounds/interaction/tap_sound.mp3'),
  buttonPress: require('../assets/sounds/interaction/button_press.mp3'),
  swipe: require('../assets/sounds/interaction/swipe_sound.mp3'),
  selection: require('../assets/sounds/interaction/selection_sound.mp3'),
  
  // Learning sounds
  letterSound: require('../assets/sounds/learning/letter_sound.mp3'),
  wordSound: require('../assets/sounds/learning/word_sound.mp3'),
  numberSound: require('../assets/sounds/learning/number_sound.mp3'),
  questionSound: require('../assets/sounds/learning/question_sound.mp3'),
  
  // Background music
  mainTheme: require('../assets/sounds/background/main_theme.mp3'),
  learningMode: require('../assets/sounds/background/learning_music.mp3'),
  mathMode: require('../assets/sounds/background/math_music.mp3'),
  storyMode: require('../assets/sounds/background/story_music.mp3'),
  
  // Voice prompts
  welcome: require('../assets/sounds/voice/welcome_message.mp3'),
  instructions: require('../assets/sounds/voice/instructions.mp3'),
  encouragement: require('../assets/sounds/voice/encouragement.mp3'),
  congratulations: require('../assets/sounds/voice/congratulations.mp3'),
};
