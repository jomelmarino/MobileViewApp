import { TouchableOpacity, Text } from 'react-native';
import { colors, buttonVariants } from '../theme/appTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  borderRadius?: number;
  backgroundColor?: string;
}

export const Button = ({ title, onPress, variant = 'primary', disabled = false, borderRadius = 8, backgroundColor }: ButtonProps) => {
  const getButtonStyle = () => {
    const baseStyle = backgroundColor ? { backgroundColor } : {};
    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: backgroundColor || buttonVariants.primary.backgroundColor,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: backgroundColor || buttonVariants.secondary.backgroundColor,
        };
      case 'outline':
        return {
          backgroundColor: buttonVariants.outline.backgroundColor,
          borderColor: buttonVariants.outline.borderColor,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: backgroundColor || buttonVariants.primary.backgroundColor,
        };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          color: buttonVariants.primary.textColor,
        };
      case 'secondary':
        return {
          color: buttonVariants.secondary.textColor,
        };
      case 'outline':
        return {
          color: buttonVariants.outline.textColor,
        };
      default:
        return {
          color: buttonVariants.primary.textColor,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        {
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        disabled ? { opacity: 0.5 } : {},
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[getTextStyle(), { fontWeight: 'bold', fontSize: 16 }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};