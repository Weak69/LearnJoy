import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    // Primary colors (child-friendly)
    primary: '#4CAF50',
    primaryLight: '#81C784',
    primaryDark: '#388E3C',
    
    // Secondary colors
    secondary: '#FF9800',
    secondaryLight: '#FFB74D',
    secondaryDark: '#F57C00',
    
    // Accent colors
    accent: '#E91E63',
    accentLight: '#F8BBD9',
    accentDark: '#C2185B',
    
    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F5',
    backgroundCard: '#FAFAFA',
    
  // Text colors
  text: '#212121',
  textPrimary: '#212121',
  textSecondary: '#757575',
  textTertiary: '#BDBDBD',
  textLight: '#BDBDBD',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#FFFFFF',
  textOnAccent: '#FFFFFF',
    
    // Status colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Neutral colors
    white: '#FFFFFF',
    black: '#000000',
    gray: '#9E9E9E',
    grayLight: '#F5F5F5',
    grayDark: '#616161',
    
    // Special colors for learning
    correct: '#4CAF50',
    incorrect: '#F44336',
    highlight: '#FFF176',
    progress: '#2196F3',
    // Border colors (aliases often used in components)
    border: {
      light: '#E0E0E0',
      dark: '#BDBDBD',
    } as any,
  },
  
  typography: {
    // Font sizes (large for children)
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
    body: 16,
    caption: 14,
    small: 12,
    
    // Font weights (string literals to satisfy TextStyle unions)
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    
    // Font families
    primary: 'System',
    secondary: 'System',
  } as const,
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    
    // Touch targets (minimum 60px for accessibility)
    touchTarget: 60,
    touchTargetSmall: 48,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    round: 50,
  },
  
  shadows: {
    sm: Platform.select({
      web: { boxShadow: '0 1px 2px rgba(0,0,0,0.10)' } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
    }),
    md: Platform.select({
      web: { boxShadow: '0 2px 4px rgba(0,0,0,0.15)' } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
      },
    }),
    lg: Platform.select({
      web: { boxShadow: '0 4px 8px rgba(0,0,0,0.20)' } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      },
    }),
  },
  
  layout: {
    window: {
      width,
      height,
    },
    isSmallDevice: width < 375,
    isTablet: width >= 768,
  },
  
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
};
