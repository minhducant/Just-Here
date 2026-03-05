import { useEffect } from 'react';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AuthApi } from '@/api/auth';
import { store } from '@/stores/index';
import { actions } from '@/stores/action';
import { getUserInfo } from '@/stores/user/store';
import { showMessage, setAccessToken } from '@/utils/';

const logOut = async () => {
  try {
    await setAccessToken('');
    store.dispatch(actions.user.logout());
    store.dispatch(actions.app.setIsLoggedIn(false));
  } catch (error) {
    if (__DEV__) {
      console.log('[App] Logout: ', error);
    }
  }
};

const deleteAccount = async () => {
  try {
    await AuthApi.DeletedAccount({});
    await setAccessToken('');
    store.dispatch(actions.user.logout());
    store.dispatch(actions.app.setIsLoggedIn(false));
    showMessage.success(t('account.delete_success'));
  } catch (error) {
    if (__DEV__) {
      console.log('[App] Delete Account: ', error);
    }
    showMessage.fail(t('account.delete_failed'));
  }
};

const useAccount = () => {
  const user = useSelector((state: any) => state.user.user);
  return { user };
};

const useAsyncApp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(actions.app.setLoading(true));
      try {
        const actions = [getUserInfo()];
        await Promise.all(actions.map(dispatch));
        console.log('AsyncApp: User info fetched successfully');
      } catch (error) {
        if (__DEV__) {
          console.error('AsyncApp Error:', error);
        }
      } finally {
        dispatch(actions.app.setLoading(false));
      }
    };
    fetchData();
  }, [dispatch]);
  return null;
};

export { logOut, deleteAccount, useAccount, useAsyncApp };
