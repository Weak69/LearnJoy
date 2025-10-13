export const sectionThemes = {
  swaraborna: {
    gradient: ['#4caf50ff', '#81C784'] as const,
    accent: '#4CAF50',
  },
  banjonborno: {
    gradient: ['#4caf50ff', '#81C784'] as const,
    accent: '#4CAF50',
  },
  // English categories
  vowels: {
    gradient: ['#3F51B5', '#5C6BC0'] as const, // Indigo shades
    accent: '#3F51B5',
  },
  consonants: {
    gradient: ['#8E24AA', '#BA68C8'] as const, // Purple shades
    accent: '#8E24AA',
  },
} as const;

export type SectionKey = keyof typeof sectionThemes;
