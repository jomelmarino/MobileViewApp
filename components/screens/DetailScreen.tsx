import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { getAnnouncementById, supabase } from '../../src/utils/supabase';

interface Item {
  id: string;
  title: string;
  description: string;
  date?: string;
  time?: string;
  location?: string;
  category: string;
  image_path?: string;
  imageUrl?: string;
  created_at?: string;
}

interface DetailScreenProps {
  type: 'announcement';
  id: string;
  onBack: () => void;
}

export const DetailScreen = ({ type, id, onBack }: DetailScreenProps) => {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (imagePath: string) => {
    const { data } = supabase.storage
      .from('posts')
      .getPublicUrl(imagePath);
    return data.publicUrl;
  };

  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await getAnnouncementById(id);

      if (error) {
        console.error('Error fetching item:', error);
      } else {
        const itemWithImage = {
          ...data,
          imageUrl: data.image_path ? getImageUrl(data.image_path) : null
        };
        setItem(itemWithImage);
      }
      setLoading(false);
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  if (loading || !item) {
    return (
      <View className="flex-1 bg-primary-10 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary-10">
      {/* Header */}
      <View className="bg-primary-30 pt-10 pb-6 px-6 rounded-bl-[30px] rounded-br-[30px]">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={onBack} className="mr-6">
            <Text className="text-white text-lg font-bold">
              ←
            </Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">
            Announcement Details
          </Text>
        </View>

        {/* Category Badge */}
        <View className="self-start px-6 py-2 rounded-full">
          <Text className="text-white text-2xl font-bold">
            {item.category}
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 "
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View className="h-[200px] bg-gray-300 justify-center items-center m-6 rounded-lg">
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} className="w-full h-full rounded-lg" resizeMode="cover" />
          ) : (
            <Text className="text-gray-500 text-lg">No Image</Text>
          )}
        </View>

        {/* Content Card */}
        <View className="bg-white mx-6 mb-6 rounded-lg p-6 shadow-md">
          <Text className="text-xl font-bold text-gray-900 mb-6">
            {item.title}
          </Text>

          {/* Date and Time */}
          <View className="flex-row items-center mb-3">
            <Text className="text-lg mr-2">
              📅
            </Text>
            <View>
              <Text className="text-base text-gray-900 font-semibold">
                {item.date}
              </Text>
              {item.time && (
                <Text className="text-sm text-gray-500">
                  {item.time}
                </Text>
              )}
            </View>
          </View>

          {/* Location */}
          {item.location && (
            <View className="flex-row items-center mb-6">
              <Text className="text-lg mr-2">
                📍
              </Text>
              <Text className="text-base text-gray-900">
                {item.location}
              </Text>
            </View>
          )}

          {/* Description */}
          <Text className="text-base text-gray-500 leading-6">
            {item.description}
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};
