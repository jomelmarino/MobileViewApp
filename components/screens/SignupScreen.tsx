import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { supabase } from '../../src/utils/supabase';

interface SignupScreenProps {
  onSignupSuccess: () => void;
  onNavigateToLogin: () => void;
}

export const SignupScreen = ({ onSignupSuccess, onNavigateToLogin }: SignupScreenProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        onNavigateToLogin();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        Alert.alert('Signup Failed', error.message);
        console.error('Signup error:', error);
      } else {
        if (data.session) {
          onNavigateToLogin();
        } else {
          Alert.alert('Please check your email', '', [
            { text: 'OK', onPress: onNavigateToLogin }
          ]);
        }
      }
    } catch (err) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-primary-10"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      
      
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-center p-8"
      >
        {/* Signup Form */}
        <View className="bg-white rounded-lg p-8 shadow-lg">
          <Text className="text-2xl font-bold text-gray-900 text-center mb-8">
            Create Account
          </Text>
          {/* Full Name Input */}
          <View className="mb-8">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Full Name
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 bg-white text-base text-gray-900"
              placeholder="Enter your full name"
              placeholderTextColor="#6c757d"
              value={fullName}
              onChangeText={setFullName}
              autoComplete="name"
            />
          </View>
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
              autoComplete="password-new"
            />
          </View>

          {/* Confirm Password Input */}
          <View className="mb-8">
            <Text className="text-base font-semibold text-gray-900 mb-2">
              Confirm Password
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 bg-white text-base text-gray-900"
              placeholder="Confirm your password"
              placeholderTextColor="#6c757d"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoComplete="password-new"
            />
          </View>

          {/* Signup Button */}
          <View className="w-full mb-3">
            <Button
              title={loading ? "Signing Up..." : "Sign Up"}
              onPress={handleSignup}
              disabled={!fullName || !email || !password || !confirmPassword || password !== confirmPassword || loading}
            />
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-gray-500 text-base">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={onNavigateToLogin}>
              <Text className="text-blue-500 font-bold text-base">
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};