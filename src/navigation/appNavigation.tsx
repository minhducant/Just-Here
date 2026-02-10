import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from '@/navigation/bottomTabs';
import { navigationRef } from '@/navigation/rootNavigation';

const Stack = createNativeStackNavigator();

import LoginScreen from '@/screens/auth/LoginScreen';
import SettingsScreen from '@/screens/home/SettingsScreen';
import OnboardingScreen from '@/screens/auth/OnboardingScreen';
import NotificationScreen from '@/screens/home/NotificationScreen';

export const AppNavigation = () => {
  const dispatch = useDispatch();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
