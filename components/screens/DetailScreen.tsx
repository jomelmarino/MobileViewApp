import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../common/Button';

interface DetailScreenProps {
  type: 'announcement' | 'event';
  onBack: () => void;
  onAddToCalendar?: () => void;
  onShare?: () => void;
}

export const DetailScreen = ({ type, onBack, onAddToCalendar, onShare }: DetailScreenProps) => {
  // TODO: Fetch item details from Supabase based on type and id
  // Example: const { data: item, error } = await supabase.from(type === 'announcement' ? 'announcements' : 'events').select('*').eq('id', id).single();
  // if (error) { console.error('Error fetching item:', error); }
  // else { setItem(data); }

  // TODO: Replace mock data with Supabase data
  // Use: const { data: item, error } = await supabase.from(type === 'announcement' ? 'announcements' : 'events').select('*').eq('id', id).single();
  const item = {
    id: '1',
    title: type === 'announcement'
      ? 'System Maintenance Notice'
      : 'Company Annual Meeting',
    date: '2023-06-20',
    time: type === 'event' ? '10:00 AM - 12:00 PM' : undefined,
    location: type === 'event' ? 'Main Conference Hall, 3rd Floor' : undefined,
    category: type === 'announcement' ? 'Technical' : 'Corporate',
    description: type === 'announcement'
      ? 'We would like to inform all employees that our system will be undergoing scheduled maintenance this weekend. During this time, access to certain services may be temporarily unavailable.\n\nThe maintenance window is scheduled from Saturday, June 24th at 10:00 PM to Sunday, June 25th at 2:00 AM. We apologize for any inconvenience this may cause and appreciate your understanding as we work to improve our systems.\n\nIf you have any urgent matters that need attention during this period, please contact the IT support team at support@company.com.'
      : 'Join us for our annual company meeting where we\'ll discuss our achievements over the past year and our goals for the future. This is a great opportunity to connect with colleagues from all departments and learn about exciting developments in our company.\n\nAgenda:\n- Welcome and introductions\n- CEO keynote address\n- Department highlights\n- Q&A session\n- Networking reception',
    imageUrl: 'https://example.com/image.jpg',
  };

  return (
    <View className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="bg-blue-500 pt-10 pb-6 px-6 rounded-bl-[30px] rounded-br-[30px]">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={onBack} className="mr-6">
            <Text className="text-white text-lg font-bold">
              ←
            </Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">
            {type === 'announcement' ? 'Announcement' : 'Event'} Details
          </Text>
        </View>

        {/* Category Badge */}
        <View className="bg-white self-start px-6 py-2 rounded-full">
          <Text className="text-blue-500 text-sm font-bold">
            {item.category}
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View className="h-[200px] bg-gray-300 justify-center items-center m-6 rounded-lg">
          <Text className="text-gray-500 text-lg">
            📷 Image Placeholder
          </Text>
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

        {/* Action Buttons for Events */}
        {type === 'event' && (
          <View className="px-6 mb-6">
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button
                  title="Add to Calendar"
                  onPress={onAddToCalendar || (() => {})}
                  variant="outline"
                />
              </View>
              <View className="flex-1">
                <Button
                  title="Share Event"
                  onPress={onShare || (() => {})}
                  variant="primary"
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};