import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '../common/Button';

interface ProfileScreenProps {
  onLogout: () => void;
  onEditProfile: () => void;
}

export const ProfileScreen = ({ onLogout, onEditProfile }: ProfileScreenProps) => {
  // TODO: Fetch user data from Supabase
  // Example: const { data: user, error } = await supabase.auth.getUser();
  // if (error) { console.error('Error fetching user:', error); }
  // else { setUser(user); }

  // TODO: Replace mock data with Supabase data
  // Use: const { data: { user }, error } = await supabase.auth.getUser();
  const user = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: 'https://example.com/avatar.jpg',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: 'January 2022',
    phone: '+1 (555) 123-4567',
  };

  const menuItems = [
    { title: 'Personal Information', icon: '👤' },
    { title: 'Notifications', icon: '🔔' },
    { title: 'Privacy & Security', icon: '🔒' },
    { title: 'Help & Support', icon: '❓' },
    { title: 'About', icon: 'ℹ️' },
  ];

  return (
    <View className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="bg-blue-500 pt-10 pb-8 px-6 rounded-bl-3xl rounded-br-3xl items-center">
        <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-6 border-4 border-white">
          <Text className="text-blue-500 text-3xl font-bold">
            {user.name.charAt(0)}
          </Text>
        </View>
        <Text className="text-2xl font-bold text-white mb-2">
          {user.name}
        </Text>
        <Text className="text-base text-white opacity-80">
          {user.position} • {user.department}
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
              Email
            </Text>
            <Text className="text-base text-gray-900">
              {user.email}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-sm text-blue-600 mb-2">
              Phone
            </Text>
            <Text className="text-base text-gray-900">
              {user.phone}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-sm text-blue-600 mb-2">
              Department
            </Text>
            <Text className="text-base text-gray-900">
              {user.department}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-sm text-blue-600 mb-2">
              Member Since
            </Text>
            <Text className="text-base text-gray-900">
              {user.joinDate}
            </Text>
          </View>

          <Button title="Edit Profile" onPress={onEditProfile} variant="outline" />
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
        <View className="p-6">
          <Button title="Log Out" onPress={onLogout} variant="secondary" />
        </View>
      </ScrollView>
    </View>
  );
};