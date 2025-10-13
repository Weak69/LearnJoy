export const colors = {
  // Primary learning colors (bright and cheerful)
  primary: {
    50: '#E8F5E8',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Main primary
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },
  
  // Secondary colors (orange for math)
  secondary: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800', // Main secondary
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
  },
  
  // Accent colors (pink for fun)
  accent: {
    50: '#FCE4EC',
    100: '#F8BBD9',
    200: '#F48FB1',
    300: '#F06292',
    400: '#EC407A',
    500: '#E91E63', // Main accent
    600: '#D81B60',
    700: '#C2185B',
    800: '#AD1457',
    900: '#880E4F',
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
    secondary: '#F8F9FA',
    tertiary: '#F5F5F5',
    card: '#FAFAFA',
    modal: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    tertiary: '#BDBDBD',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onAccent: '#FFFFFF',
  },
  
  // Border colors
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#757575',
    focus: '#4CAF50',
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
