// Color Palette
export const colors = {
  primary: '#107DAC', // Primary color for calls to action
  secondary: '#6c757d', // Secondary color
  background: '#ffffff', // Main background color
  cardBackground: '#ffffff', // Card background color
  text: '#212529', // Primary text color
  textSecondary: '#6c757d', // Secondary text color
  textLight: '#f8f9fa', // Light text color
  border: '#e9ecef', // Border color
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
};

// Typography
export const typography = {
  fontFamily: {
    regular: 'system font', // Default system font
    bold: 'system font', // Default system font with bold weight
  },
  fontSize: {
    small: 12,
    regular: 16,
    large: 20,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    regular: '400',
    bold: '700',
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

// Border Radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Button Variants
export const buttonVariants = {
  primary: {
    backgroundColor: '#3b82f6',
    textColor: colors.textLight,
    borderColor: '#3b82f6',
  },
  secondary: {
    backgroundColor: colors.secondary,
    textColor: colors.textLight,
    borderColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    textColor: colors.primary,
    borderColor: colors.primary,
  },
};