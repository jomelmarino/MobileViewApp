import { View, Text, TouchableOpacity } from 'react-native';
import { colors, shadows, spacing, borderRadius, typography } from '../theme/appTheme';

interface CardProps {
  title: string;
  description?: string;
  date?: string;
  onPress?: () => void;
  image?: string;
  children?: React.ReactNode;
}

export const Card = ({ title, description, date, onPress, image, children }: CardProps) => {
  return (
    <TouchableOpacity
      style={[
        shadows.md,
        {
          backgroundColor: colors.cardBackground,
          borderRadius: borderRadius.lg,
          marginBottom: spacing.md,
          overflow: 'hidden',
        },
      ]}
      onPress={onPress}
    >
      {image && (
        <View
          style={{
            height: 160,
            backgroundColor: colors.border,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* In a real app, you would use Image component here */}
          <Text
            style={{
              textAlign: 'center',
              color: colors.textSecondary,
            }}
          >
            Image Placeholder
          </Text>
        </View>
      )}
      <View
        style={{
          padding: spacing.lg,
        }}
      >
        <Text
          style={{
            fontSize: typography.fontSize.large,
            fontWeight: 'bold',
            color: colors.text,
          }}
        >
          {title}
        </Text>
        {date && (
          <Text
            style={{
              fontSize: typography.fontSize.small,
              color: colors.textSecondary,
              marginTop: spacing.sm,
            }}
          >
            {date}
          </Text>
        )}
        {description && (
          <Text
            style={{
              color: colors.textSecondary,
              marginTop: spacing.sm,
            }}
            numberOfLines={2}
          >
            {description}
          </Text>
        )}
        {children}
      </View>
    </TouchableOpacity>
  );
};