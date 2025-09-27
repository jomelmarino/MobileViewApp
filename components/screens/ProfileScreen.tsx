import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from '../common/Button';
import { getCurrentUser } from '../../src/utils/supabase';
import type { User } from '@supabase/supabase-js';

interface ProfileScreenProps {
  onLogout: () => void;
  onEditProfile: () => void;
}

export const ProfileScreen = ({ onLogout, onEditProfile }: ProfileScreenProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  const user = {
    name: currentUser?.user_metadata?.full_name || 'Loading...',
    email: currentUser?.email || 'Loading...',
  };

  const menuItems = [
    { title: 'Personal Information', icon: '👤' },
    { title: 'Notifications', icon: '🔔' },
    { title: 'Privacy & Security', icon: '🔒' },
    { title: 'Help & Support', icon: '❓' },
    { title: 'About', icon: 'ℹ️' },
  ];

  return (
    <View className="flex-1 bg-primary-10">
      {/* Header */}
      <View className="bg-primary-30 pt-10 pb-8 px-6 rounded-bl-3xl rounded-br-3xl items-center relative">
        <View className="absolute top-12 right-4 p-2">
          <Button title="Log Out" onPress={onLogout} variant="secondary" />
        </View>

        <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-6 border-4 border-white">
          <Text className="text-blue-500 text-3xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text className="text-2xl font-bold text-white mb-2">
          {user.name}
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Info Card */}
        <View className="bg-white m-6 rounded-lg p-6 shadow-md">
          <Text className="text-xl font-bold text-gray-900 mb-6">
            Profile Information
          </Text>

          <View className="mb-6">
            <Text className="text-sm text-blue-600 mb-2">
              Full Name
            </Text>
            <Text className="text-base text-gray-900">
              {user.name}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-sm text-blue-600 mb-2">
              Email
            </Text>
            <Text className="text-base text-gray-900">
              {user.email}
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white mx-6 rounded-lg shadow-md">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              className={`flex-row items-center p-6 ${index < menuItems.length - 1 ? 'border-b border-blue-200' : ''}`}
            >
              <Text className="text-xl mr-6">
                {item.icon}
              </Text>
              <Text className="text-base text-gray-900 flex-1">
                {item.title}
              </Text>
              <Text className="text-xl text-blue-600">
                ›
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        
      </ScrollView>
    </View>
  );
};
