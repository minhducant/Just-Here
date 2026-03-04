import { isString } from 'underscore';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

type keyStore = string;

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

export { setStorage, getStorage, multiRemove };
