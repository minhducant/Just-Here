import { t } from 'i18next';
import { isString } from 'underscore';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showMessage } from '@/utils/';

type keyStore = string;

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

const setAccessToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword(ACCESS_TOKEN_KEY, token, {
      service: ACCESS_TOKEN_KEY,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
  } catch (error) {
    showMessage.fail(t('error.default'));
  }
};
const getAccessToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: ACCESS_TOKEN_KEY,
    });
    if (credentials) {
      return credentials.password;
    }
    return null;
  } catch (error) {
    showMessage.fail(t('error.default'));
    return null;
  }
};

const deleteAccessToken = async () => {
  try {
    await Keychain.resetGenericPassword({
      service: ACCESS_TOKEN_KEY,
    });
  } catch (error) {
    showMessage.fail(t('error.default'));
  }
};

const setStorage = (key: keyStore, value: any) => {
  return AsyncStorage.setItem(key, JSON.stringify(value));
};

const getStorage = async (key: keyStore) => {
  let data: any = await AsyncStorage.getItem(key);
  if (isString(data)) {
    return JSON.parse(data);
  }
  return null;
};

const multiRemove = async (list: keyStore[]) => {
  return AsyncStorage.multiRemove(list);
};

export {
  setStorage,
  getStorage,
  multiRemove,
  ACCESS_TOKEN_KEY,
  setAccessToken,
  getAccessToken,
  deleteAccessToken,
};
