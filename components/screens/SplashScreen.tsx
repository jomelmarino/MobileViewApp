import { View, Text, Image, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

interface SplashScreenProps {
  onSplashComplete: () => void;
}

export const SplashScreen = ({ onSplashComplete }: SplashScreenProps) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onSplashComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onSplashComplete]);

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.3, duration: 500, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start(() => animate());
    };
    animate();
  }, [fadeAnim]);

  return (
    <View className="flex-1 bg-primary-10 items-center justify-center">
      <View className="items-center">
        {/* App logo - using the app icon from assets */}
        <Image source={require('../../assets/Logo.png')} className="w-40 h-40 mb-6" />
        <Text className="text-2x1 font-bold text-gray-900 text-center px-4 mb-2 ">
            Development of an online admission and enrollment
          portal for Kasiglahan senior high school:A Quantitative 
                analysis of user Experience and efficiency
        </Text>
        <Animated.Text style={{ opacity: fadeAnim }} className="text-black-500 mt-2">
          Loading...
        </Animated.Text>
      </View>
    </View>
  );
};