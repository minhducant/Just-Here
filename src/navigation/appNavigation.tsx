import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { navigationRef } from '@navigation/rootNavigation';

const Stack = createNativeStackNavigator();

import HomeScreen from '@screens/home';
import LoginScreen from '@screens/login';
import SettingsScreen from '@screens/settings';
import OnboardingScreen from '@screens/onboarding';
import NotificationScreen from '@screens/notification';

export const AppNavigation = () => {
  const dispatch = useDispatch();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
