export const colors = {
  // Primary learning colors (bright and cheerful)
  primary: {
    50: '#F5F7FF',
    100: '#E8EEFF',
    200: '#D8E2FF',
    300: '#C6D4FF',
    400: '#9FB3F5',
    500: '#6B7FD7', // Main primary (bangla theme)
    600: '#5A6EC6',
    700: '#4A5DB5',
    800: '#3B4AA0',
    900: '#2C387A',
  },
  
  // Secondary colors (orange for math)
  secondary: {
    50: '#F0FAFF',
    100: '#E6F4FF',
    200: '#CFF0FF',
    300: '#9FDFFF',
    400: '#6FCFFF',
    500: '#4BA3FF', // Main secondary (soft blue)
    600: '#1E8BFF',
    700: '#1777D1',
    800: '#125EA6',
    900: '#0D456E',
  },
  
  // Accent colors (pink for fun)
  accent: {
    50: '#F7F5FF',
    100: '#EFEAFF',
    200: '#E0DBFF',
    300: '#D6CCFF',
    400: '#B9A8FF',
    500: '#6B7FD7', // use primary family for accent
    600: '#5A6EC6',
    700: '#4A5DB5',
    800: '#3B4AA0',
    900: '#2C387A',
  },
  
  // Status colors
  status: {
    success: '#4CAF50',
    successLight: '#C8E6C9',
    warning: '#FF9800',
    warningLight: '#FFE0B2',
    error: '#F44336',
    errorLight: '#FFCDD2',
    info: '#2196F3',
    infoLight: '#BBDEFB',
  },
  
  // Neutral colors
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Special learning colors
  learning: {
    correct: '#4CAF50',
    correctLight: '#E8F5E8',
    incorrect: '#F44336',
    incorrectLight: '#FFEBEE',
    highlight: '#FFF176',
    highlightLight: '#FFFDE7',
    progress: '#2196F3',
    progressLight: '#E3F2FD',
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F7FF',
    tertiary: '#F5F7FF',
    card: '#FFFFFF',
    modal: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Text colors
  text: {
    primary: '#333333',
    heading: '#6B7FD7',
    secondary: '#475569',
    tertiary: '#94A3B8',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onAccent: '#FFFFFF',
  },
  
  // Border colors
  border: {
    light: '#E0E5FF',
    medium: '#BDBDBD',
    dark: '#757575',
    focus: '#6B7FD7',
    error: '#F44336',
  },
};

// Helper function to get color with opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

// Common color combinations for UI elements
export const colorCombinations = {
  primary: {
    background: colors.primary[500],
    text: colors.text.onPrimary,
    border: colors.primary[700],
  },
  secondary: {
    background: colors.secondary[500],
    text: colors.text.onSecondary,
    border: colors.secondary[700],
  },
  success: {
    background: colors.status.success,
    text: colors.text.onPrimary,
    border: colors.status.success,
  },
  error: {
    background: colors.status.error,
    text: colors.text.onPrimary,
    border: colors.status.error,
  },
  neutral: {
    background: colors.neutral[100],
    text: colors.text.primary,
    border: colors.border.light,
  },
};
