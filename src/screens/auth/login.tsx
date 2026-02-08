import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'react-native-zalo-kit';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Keyboard, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { AuthApi } from '@api/auth';
import { showMessage, setStorage } from '@utils/index';
import { authStyle as styles } from '@styles/auth.style';
import DismissKeyboard from '@components/base/dismissKeyboard';
import { IconFacebook, IconGoogle, IconZalo } from '@assets/icons/index';

export default function LoginScreen() {
  const { t } = useTranslation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '915630225974-k538p1mb8sschti70n9dab1286cul6dt.apps.googleusercontent.com',
      iosClientId:
        '915630225974-u7i1crjrdva07jbbdog18kces5pi2fpe.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const onLoginFacebook = async () => {
    // try {
    //   const result = await LoginManager.logInWithPermissions([
    //     'public_profile',
    //     'email',
    //   ]);
    //   if (result.isCancelled) {
    //     return;
    //   }
    //   const data = await AccessToken.getCurrentAccessToken();
    //   if (!data) {
    //     return;
    //   }
    //   let accessToken: any = data.accessToken;
    //   dispatch(setIsLoading(true));
    //   const dataLogin = await AuthApi.LoginFacebook({ accessToken });
    //   await setStorage('accessToken', dataLogin.data.accessToken);
    //   await setStorage('refreshToken', dataLogin.data.refreshToken);
    //   dispatch(setAppStatus(3));
    // } catch (error) {
    //   if (__DEV__) {
    //     console.error('Facebook login error:', error);
    //   }
    // } finally {
    //   dispatch(setIsLoading(false));
    // }
  };

  const onLoginGoogle = async () => {
    await GoogleSignin.hasPlayServices();
    try {
      const data = await GoogleSignin.signIn();
      if (!data) {
        showMessage.fail('Đăng nhập thất bại, vui lòng thử lại!');
        return;
      }
      console.log(data);
      // const { accessToken } = await GoogleSignin.getTokens();
      // const dataLogin = await AuthApi.LoginGoogle({ accessToken });
      // await setStorage('accessToken', dataLogin.data.accessToken);
      // await setStorage('refreshToken', dataLogin.data.refreshToken);
      // dispatch(setIsLoading(false));
      // dispatch(setAppStatus(3));
    } catch (error) {
      if (__DEV__) {
        console.log('[App] Google Login: ', error);
      }
      return;
    }
  };

  const onLoginZalo = async () => {
    try {
      const oauthCode: any = await login('AUTH_VIA_APP_OR_WEB');
      let accessToken: any = oauthCode.accessToken;
      console.log(accessToken);
      // dispatch(setIsLoading(true));
      // console.log(accessToken);
      // const dataLogin = await AuthApi.LoginZalo({ accessToken });
      // await setStorage('accessToken', dataLogin.data.accessToken);
      // await setStorage('refreshToken', dataLogin.data.refreshToken);
      // dispatch(setIsLoading(false));
      // dispatch(setAppStatus(3));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={onLoginGoogle}
          activeOpacity={0.5}
          style={styles.buttonLoginWith}
        >
          <IconGoogle />
          <Text style={styles.buttonLoginText}>
            {t('auth.continue_with_google')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onLoginFacebook}
          activeOpacity={0.5}
          style={[styles.buttonLoginWith]}
        >
          <IconFacebook />
          <Text style={styles.buttonLoginText}>
            {t('auth.continue_with_facebook')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onLoginZalo}
          activeOpacity={0.5}
          style={[styles.buttonLoginWith]}
        >
          <IconZalo />
          <Text style={styles.buttonLoginText}>
            {t('auth.continue_with_zalo')}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </DismissKeyboard>
  );
}
