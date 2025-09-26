import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, Dimensions, Alert } from 'react-native';
import { useState } from 'react';
import { Button } from '../common/Button';
import { supabase } from '../../src/utils/supabase';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToSignup: () => void;
}

export const LoginScreen = ({ onLoginSuccess, onNavigateToSignup }: LoginScreenProps) => {
  const { width } = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
        console.error('Login error:', error);
      } else {
        Alert.alert('Login Successful', 'Welcome back!');
        onLoginSuccess();
      }
    } catch (err) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (

    <KeyboardAvoidingView
      className="flex-1 bg-primary-10"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        className="absolute bg-primary-30 top-0 left-0 right-0 bg-primary-20 shadow-lg z-0"
        style={{
          height: width / 2,
          borderBottomLeftRadius: width / 2,
          borderBottomRightRadius: width / 2,
        }}
      >
        <View className="items-center mb-12 mt-6">
          <Image source={require('../../assets/Logo.png')} className="w-56 h-56" />
        </View>
      </View>
      
      <ScrollView
        className="flex-1"
        style={{ marginTop: width / 2 }}
        contentContainerClassName="flex-grow justify-center p-8"
      >
        {/* Login Form */}
        <View className="bg-white rounded-lg p-8 shadow-lg">
          <Text className="text-2xl font-bold text-gray-900 text-center mb-8">
            Log in
          </Text>
          {/* Email Input */}
          <View className="mb-8">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Email
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 bg-white text-base text-gray-900"
              placeholder="Enter your email"
              placeholderTextColor="#6c757d"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              autoComplete="email"
            />
          </View>

          {/* Password Input */}
          <View className="mb-8">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Password
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 bg-white text-base text-gray-900"
              placeholder="Enter your password"
              placeholderTextColor="#6c757d"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoComplete="password"
            />
          </View>
          {/* Sign Up Button */}
          <View className="w-full self-center mb-6 opacity-40">
            <Button
              title="Create an account"
              onPress={onNavigateToSignup}
              variant="outline"
            />
          </View>


          {/* Login Button */}
          { /* TODO: Change the login button title to "Log In" */ }
          <View className="w-1/2 self-center mb-3">
            <Button
              title={loading ? "Logging In..." : "Log In"}
              onPress={handleLogin}
              disabled={!email || !password || loading}
              borderRadius={60}
              variant="secondary"
            />
          </View>
        </View>
      </ScrollView>

    </KeyboardAvoidingView>

  );
};