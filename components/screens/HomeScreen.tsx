import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

interface HomeScreenProps {
  onNavigateToAnnouncements: () => void;
  onNavigateToDetail: (type: 'announcement' | 'event', id: string) => void;
}

export const HomeScreen = ({ onNavigateToAnnouncements, onNavigateToDetail }: HomeScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Fetch announcements from Supabase
  // Example: const { data: announcements, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(5);
  // if (error) { console.error('Error fetching announcements:', error); }
  // else { setAnnouncements(data); }

  // TODO: Replace mock data with Supabase data
  // Use: const { data: announcements, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(5);
  const announcements = [
    {
      id: '1',
      title: 'System Maintenance',
      description: 'Scheduled maintenance will occur this weekend. Services may be temporarily unavailable.',
      date: '2023-06-15',
      image: 'image1.png',
    },
    {
      id: '2',
      title: 'New Features Available',
      description: 'We\'ve added new features to improve your experience. Check them out in the settings.',
      date: '2023-06-10',
      image: 'favicon.png',
    },
  ];


  const AnnouncementCard = ({ announcement }: { announcement: typeof announcements[0] }) => (
    <TouchableOpacity
      className="bg-white rounded-lg mb-4 shadow-md"
      onPress={() => onNavigateToDetail('announcement', announcement.id)}
    >
      <View className="h-30 bg-gray-300 rounded-t-lg justify-center items-center">
        <Text className="text-gray-500">Image Placeholder</Text>
      </View>
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-900 mb-2">
          {announcement.title}
        </Text>
        <Text
          className="text-base text-gray-500 mb-2"
          numberOfLines={2}
        >
          {announcement.description}
        </Text>
        <Text className="text-sm text-blue-500 font-semibold">
          {announcement.date}
        </Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <View className="flex-1 bg-primary-10">
      {/* Header */}
      <View className="bg-primary-30 pt-10 pb-6 px-6 rounded-bl-[30px] rounded-br-[30px]">
        <Text className="text-3xl font-bold text-white mb-2">
          Welcome Back!
        </Text>
        <Text className="text-base text-white opacity-90">
          Stay updated with latest announcements
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View className="p-6">
          <View className="flex-row items-center bg-white rounded-lg px-6 py-3 shadow-sm">
            <TextInput
              className="flex-1 text-base text-gray-900"
              placeholder="Search announcements..."
              placeholderTextColor="#6c757d"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity>
              <Text className="text-blue-500 font-bold text-base">
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Announcements Section */}
        <View className="px-6 mb-10">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-900">
              Announcements
            </Text>
            <TouchableOpacity onPress={onNavigateToAnnouncements}>
              <Text className="text-black-500 text-base font-semibold">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};