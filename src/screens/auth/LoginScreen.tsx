import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'react-native-zalo-kit';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Text, View, Platform, StatusBar, TouchableOpacity, useColorScheme } from 'react-native';

import { AuthApi } from '@/api/auth';
import { actions } from '@/stores/action';
import { getTheme } from '@/constants/theme';
import { showMessage } from '@/utils/index';
import { authStyles } from '@/styles/auth.style';
import DismissKeyboard from '@/components/base/dismissKeyboard';
import { IconGoogle, IconZalo, IconApple } from '@/assets/icons/index';

export default function LoginScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark' ? 'dark' : 'light');
  const styles = authStyles(theme);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '915630225974-k538p1mb8sschti70n9dab1286cul6dt.apps.googleusercontent.com',
      iosClientId: '915630225974-u7i1crjrdva07jbbdog18kces5pi2fpe.apps.googleusercontent.com',
    });
  }, []);

  const onLoginZalo = async () => {
    try {
      const oauthCode: any = await login('AUTH_VIA_APP_OR_WEB');
      let accessToken: any = oauthCode.accessToken;
      const dataLogin = await AuthApi.LoginZalo({ accessToken });
      console.log('Zalo login data: ', dataLogin);
    } catch (error) {
      if (__DEV__) {
        console.log('[App] Zalo Login: ', error);
      }
      showMessage.fail(t('auth.zalo_login_failed'));
    } finally {
    }
  };

  const onLoginGoogle = async () => {
    await GoogleSignin.hasPlayServices();
    try {
      const data = await GoogleSignin.signIn();
      if (!data) {
        showMessage.fail(t('auth.google_login_failed'));
        return;
      }
    } catch (error) {
      if (__DEV__) {
        console.log('[App] Google Login: ', error);
      }
      showMessage.fail(t('auth.google_login_failed'));
    } finally {
    }
  };

  const onLoginApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const { identityToken } = appleAuthRequestResponse;
      console.log('Apple identity token: ', identityToken);
      if (!identityToken) {
        showMessage.fail(t('auth.apple_login_failed'));
        return;
      }
      // const dataLogin = await AuthApi.LoginApple({ identityToken });
      // console.log('Apple login data: ', dataLogin);
    } catch (error: any) {
      if (__DEV__) {
        console.log('[App] Apple Login: ', error);
      }
      showMessage.fail(t('auth.apple_login_failed'));
    } finally {
    }
  };
  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.viewButton}>
          <Text style={styles.title}>Just Here</Text>
          <Text style={styles.subtitle}>Just be here today. That’s enough.</Text>
          <TouchableOpacity
            onPress={onLoginGoogle}
            activeOpacity={0.5}
            style={styles.buttonLoginWith}
          >
            <IconGoogle />
            <Text style={styles.buttonLoginText}>{t('auth.continue_with_google')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onLoginZalo}
            activeOpacity={0.5}
            style={[styles.buttonLoginWith]}
          >
            <IconZalo />
            <Text style={styles.buttonLoginText}>{t('auth.continue_with_zalo')}</Text>
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              onPress={onLoginApple}
              activeOpacity={0.5}
              style={[styles.buttonLoginWith]}
            >
              <IconApple />
              <Text style={styles.buttonLoginText}>{t('auth.continue_with_apple')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
}
