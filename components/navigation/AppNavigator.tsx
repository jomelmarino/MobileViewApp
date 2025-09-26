import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AnnouncementsScreen } from '../screens/AnnouncementsScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

type Screen = 'splash' | 'login' | 'signup' | 'home' | 'announcements' | 'detail' | 'profile';

export const AppNavigator = () => {
  // TODO: Add authentication state management
  // Use: const [user, setUser] = useState(null);
  // Check: const { data: { user } } = await supabase.auth.getUser();
  // Redirect to login if not authenticated

  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [detailType, setDetailType] = useState<'announcement' | 'event'>('announcement');
  const [detailId, setDetailId] = useState<string>('');

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const navigateToDetail = (type: 'announcement' | 'event', id: string) => {
    setDetailType(type);
    setDetailId(id);
    navigateTo('detail');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onSplashComplete={() => navigateTo('login')} />;
      case 'login':
        return <LoginScreen onLoginSuccess={() => navigateTo('home')} onNavigateToSignup={() => navigateTo('signup')} />;
      case 'signup':
        return <SignupScreen onSignupSuccess={() => navigateTo('home')} onNavigateToLogin={() => navigateTo('login')} />;
      case 'home':
        return (
          <HomeScreen
            onNavigateToAnnouncements={() => navigateTo('announcements')}
            onNavigateToDetail={navigateToDetail}
          />
        );
      case 'announcements':
        return (
          <AnnouncementsScreen
            onNavigateToDetail={navigateToDetail}
            onBack={() => navigateTo('home')}
          />
        );
      case 'detail':
        return (
          <DetailScreen
            type={detailType}
            onBack={() => navigateTo('announcements')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onLogout={() => navigateTo('login')}
            onEditProfile={() => console.log('Edit profile')}
          />
        );
      default:
        return <HomeScreen onNavigateToAnnouncements={() => navigateTo('announcements')} onNavigateToDetail={navigateToDetail} />;
    }
  };

  const BottomNavigationBar = () => {
    if (currentScreen === 'splash' || currentScreen === 'login' || currentScreen === 'signup') {
      return null;
    }

    return (
      <View className="flex-row bg-blue-100 border-t border-blue-300">
        <TouchableOpacity
          className={`flex-1 items-center justify-center py-4 ${currentScreen === 'home' ? 'bg-blue-300' : ''}`}
          onPress={() => navigateTo('home')}
        >
          <Text className={`font-bold text-base ${currentScreen === 'home' ? 'text-blue-500' : 'text-blue-500'}`}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 items-center justify-center py-4 ${currentScreen === 'announcements' ? 'bg-blue-300' : ''}`}
          onPress={() => navigateTo('announcements')}
        >
          <Text className={`font-bold text-base ${currentScreen === 'announcements' ? 'text-blue-500' : 'text-blue-500'}`}>
            Announcements
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 items-center justify-center py-4 ${currentScreen === 'profile' ? 'bg-blue-300' : ''}`}
          onPress={() => navigateTo('profile')}
        >
          <Text className={`font-bold text-base ${currentScreen === 'profile' ? 'text-blue-500' : 'text-blue-500'}`}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1">
      {renderScreen()}
      <BottomNavigationBar />
    </View>
  );
};