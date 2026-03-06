import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import notifee from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAsyncApp } from '@/utils/';
import BottomTabs from '@/navigation/bottomTabs';
import { initNotification } from '@/utils/notification';
import { navigationRef } from '@/navigation/rootNavigation';

//--------------------Screen---------------------//
import LoginScreen from '@/screens/auth/LoginScreen';
import SettingsScreen from '@/screens/user/UserScreen';
import LanguageScreen from '@/screens/user/LanguageScreen';
import OnboardingScreen from '@/screens/auth/OnboardingScreen';
import NotificationScreen from '@/screens/home/NotificationScreen';

const RootStack = createNativeStackNavigator();
const AppStackNavigator = createNativeStackNavigator();
const AuthStackNavigator = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const screens = [SettingsScreen, LanguageScreen, NotificationScreen];

const AuthStack = () => (
  <AuthStackNavigator.Navigator initialRouteName="Login" screenOptions={screenOptions}>
    <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
  </AuthStackNavigator.Navigator>
);

const AppStack = () => {
  useAsyncApp();
  return (
    <AppStackNavigator.Navigator screenOptions={screenOptions}>
      <AppStackNavigator.Screen name="Tabs" component={BottomTabs} />
      {screens.map((ScreenComponent, index) => (
        <AppStackNavigator.Screen
          key={index}
          name={ScreenComponent.name}
          component={ScreenComponent}
        />
      ))}
    </AppStackNavigator.Navigator>
  );
};

export const AppNavigation = () => {
  const { hasCompletedOnboarding, isLoggedIn } = useSelector((state: any) => state.app);

  useEffect(() => {
    notifee.setBadgeCount(0);
    initNotification();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={screenOptions}>
        {!hasCompletedOnboarding ? (
          <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isLoggedIn ? (
          <RootStack.Screen name="Auth" component={AuthStack} />
        ) : (
          <RootStack.Screen name="App" component={AppStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
