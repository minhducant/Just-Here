import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { getTheme } from '@/constants/theme';
import { navigationStyles } from '@/styles/navigation.style';

import HomeScreen from '@/screens/home/HomeScreen';
import UserScreen from '@/screens/user/UserScreen';
import CalendarScreen from '@/screens/home/CalendarScreen';

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const ICONS = {
  Home: ['home', 'home-outline'],
  Search: ['search', 'search-outline'],
  Profile: ['person', 'person-outline'],
} as const;

export default function BottomTabs() {
  const scheme = useColorScheme();

  const theme = useMemo(() => getTheme(scheme === 'dark' ? 'dark' : 'light'), [scheme]);

  const styles = useMemo(() => navigationStyles(theme), [theme]);

  const screenOptions = ({ route }: any) => {
    const [activeIcon, inactiveIcon] = ICONS[route.name as keyof typeof ICONS] || [];
    return {
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.label,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.textMuted,
      tabBarIcon: ({ focused, color, size }: any) => (
        <Ionicons name={focused ? activeIcon : inactiveIcon} size={size ?? 22} color={color} />
      ),
    };
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={CalendarScreen} />
      <Tab.Screen name="Profile" component={UserScreen} />
    </Tab.Navigator>
  );
}
