import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

interface AnnouncementsScreenProps {
  onNavigateToDetail: (type: 'announcement', id: string) => void;
  onBack: () => void;
}

export const AnnouncementsScreen = ({ onNavigateToDetail, onBack }: AnnouncementsScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Fetch announcements from Supabase
  // Example: const { data: announcements, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
  // if (error) { console.error('Error fetching announcements:', error); }
  // else { setAnnouncements(data); }

  // TODO: Replace mock data with Supabase data
  // Use: const { data: announcements, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
  const announcements = [
    {
      id: '1',
      title: 'System Maintenance',
      description: 'Scheduled maintenance will occur this weekend. Services may be temporarily unavailable.',
      date: '2023-06-15',
      category: 'Technical',
      image: 'https://example.com/announcement1.jpg',
    },
    {
      id: '2',
      title: 'New Features Available',
      description: 'We\'ve added new features to improve your experience. Check them out in the settings.',
      date: '2023-06-10',
      category: 'Product',
      image: 'https://example.com/announcement2.jpg',
    },
    {
      id: '3',
      title: 'Office Relocation',
      description: 'Our office will be relocating to a new building next month. Stay tuned for more details.',
      date: '2023-06-05',
      category: 'Company',
      image: 'https://example.com/announcement3.jpg',
    },
    {
      id: '4',
      title: 'Holiday Schedule',
      description: 'Please note the adjusted schedule for the upcoming holiday period.',
      date: '2023-05-28',
      category: 'HR',
      image: 'https://example.com/announcement4.jpg',
    },
  ];

  const AnnouncementCard = ({ announcement }: { announcement: typeof announcements[0] }) => (


    <TouchableOpacity
      className="bg-white rounded-lg mb-6 shadow-md overflow-hidden"
      onPress={() => onNavigateToDetail('announcement', announcement.id)}
    >
      <View className="h-40 bg-gray-200 justify-center items-center">
        <Text className="text-black-600">Image Placeholder</Text>
      </View>
      <View className="p-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm text-black-500 bg-blue-100 px-2 py-0.5 rounded text-center font-semibold">
            {announcement.category}
          </Text>
          <Text className="text-sm text-black-600">
            {announcement.date}
          </Text>
        </View>
        <Text className="text-xl font-bold text-black-900 mb-2">
          {announcement.title}
        </Text>
        <Text
          className="text-base text-black-600"
          numberOfLines={2}
        >
          {announcement.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-primary-10 ">
      {/* Header */}
      <View className="bg-primary-30 pt-10 pb-6 px-6 rounded-bl-3xl rounded-br-3xl">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={onBack} className="mr-6">
            <Text className="text-white text-xl font-bold">
              ←
            </Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">
            Announcements
          </Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-lg px-6 py-4">
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

      {/* Announcements List */}
      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </ScrollView>
    </View>

  );
};