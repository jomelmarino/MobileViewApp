import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../src/utils/supabase';

interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image_path?: string;
  imageUrl?: string;
  created_at?: string;
}

interface AnnouncementsScreenProps {
  onNavigateToDetail: (type: 'announcement', id: string) => void;
  onBack: () => void;
}

export const AnnouncementsScreen = ({ onNavigateToDetail, onBack }: AnnouncementsScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (imagePath: string) => {
    const { data } = supabase.storage
      .from('announcements')
      .getPublicUrl(imagePath);
    return data.publicUrl;
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching announcements:', error);
      } else {
        // Add image URLs
        const announcementsWithImages = data.map(announcement => ({
          ...announcement,
          imageUrl: announcement.image_path ? getImageUrl(announcement.image_path) : null
        }));
        setAnnouncements(announcementsWithImages);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => (
    <TouchableOpacity
      className="bg-white rounded-lg mb-6 shadow-md overflow-hidden"
      onPress={() => onNavigateToDetail('announcement', announcement.id)}
    >
      <View className="h-40 bg-gray-200 justify-center items-center">
        {announcement.imageUrl ? (
          <Image source={{ uri: announcement.imageUrl }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <Text className="text-gray-600">No Image</Text>
        )}
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