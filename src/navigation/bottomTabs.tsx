import React from 'react';
import { useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { getTheme } from '@/constants/theme';
import { navigationStyles } from '@/styles/navigation.style';

// ===== Screens =====
import HomeScreen from '@/screens/home/HomeScreen';
import CalendarScreen from '@/screens/home/CalendarScreen';
import SettingsScreen from '@/screens/home/SettingsScreen';

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const screenOptions = {
  headerShown: false,
};

export default function BottomTabs() {
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark' ? 'dark' : 'light');
  const styles = navigationStyles(theme);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }
          return <Ionicons name={iconName} size={size ?? 22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={screenOptions} />
      <Tab.Screen name="Search" component={CalendarScreen} options={screenOptions} />
      <Tab.Screen name="Profile" component={SettingsScreen} options={screenOptions} />
    </Tab.Navigator>
  );
}
