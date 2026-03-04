import { Linking } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import { navigationRef } from '@/navigation/rootNavigation';

let fcmToken: string | null = null;

export const requestPermission = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
};

export const getToken = async () => {
  const token = await messaging().getToken();
  fcmToken = token;
  if (token) {
    console.log('FCM TOKEN:', token);
    sendTokenToBackend(token);
  }
  return token;
};

export const sendTokenToBackend = async (token: string) => {
  try {
    await fetch('https://your-api.com/device-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        platform: 'mobile',
      }),
    });
  } catch (err) {
    console.log('Send token error', err);
  }
};

export const listenTokenRefresh = () => {
  messaging().onTokenRefresh(token => {
    fcmToken = token;
    sendTokenToBackend(token);
  });
};

export const listenForeground = () => {
  messaging().onMessage(async remoteMessage => {
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
  messaging().onNotificationOpenedApp(remoteMessage => {
    handleNavigate(remoteMessage?.data);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
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
  await requestPermission();
  await getToken();
  listenForeground();
  listenBackground();
  listenNotificationPress();
  listenTokenRefresh();
};
