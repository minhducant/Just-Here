import { Linking } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import notifee, { EventType } from '@notifee/react-native';

import {
  getToken,
  onMessage,
  getMessaging,
  onTokenRefresh,
  requestPermission,
  AuthorizationStatus,
  getInitialNotification,
  onNotificationOpenedApp,
} from '@react-native-firebase/messaging';

import { navigationRef } from '@/navigation/rootNavigation';

const messaging = getMessaging(getApp());

let fcmToken: string | null = null;

export const requestUserPermission = async () => {
  const authStatus = await requestPermission(messaging);
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;
  return enabled;
};

export const getFCMToken = async () => {
  const token = await getToken(messaging);
  fcmToken = token;
  if (token) {
    console.log('FCM TOKEN:', token);
    sendTokenToBackend(token);
  }
  return token;
};

export const sendTokenToBackend = async (token: string) => {};

export const listenTokenRefresh = () => {
  onTokenRefresh(messaging, token => {
    fcmToken = token;
    sendTokenToBackend(token);
  });
};

export const listenForeground = () => {
  return onMessage(messaging, async remoteMessage => {
    const { title, body } = remoteMessage.notification || {};
    await notifee.displayNotification({
      title,
      body,
      data: remoteMessage.data,
      android: {
        channelId: 'default',
      },
    });
  });
};

export const listenBackground = () => {
  onNotificationOpenedApp(messaging, remoteMessage => {
    handleNavigate(remoteMessage?.data);
  });
  getInitialNotification(messaging).then(remoteMessage => {
    if (remoteMessage) {
      handleNavigate(remoteMessage.data);
    }
  });
};

export const listenNotificationPress = () => {
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      const data = detail.notification?.data;
      handleNavigate(data);
    }
  });
};

export const handleNavigate = (data: any) => {
  if (!data?.screen) return;
  if (navigationRef.current?.isReady()) {
    navigationRef.current.navigate(data.screen, data.params ? JSON.parse(data.params) : {});
  }
};

export const openLink = (url: string) => {
  Linking.openURL(url);
};

export const getCurrentToken = () => fcmToken;

export const initNotification = async () => {
  await requestUserPermission();
  await getFCMToken();
  listenForeground();
  listenBackground();
  listenNotificationPress();
  listenTokenRefresh();
};
