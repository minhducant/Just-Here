import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, useColorScheme, StyleSheet } from 'react-native';

import { getTheme } from '@/constants/theme';
import { navigationRef } from '@/navigation/rootNavigation';
import HeaderBackStatusBar from '@/components/header/HeaderBack';

const LanguageScreen = () => {
  const { t } = useTranslation();
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark' ? 'dark' : 'light');
  const styles = createStyles(theme);

  const onChangeLanguage = async (lang: string) => {
    navigationRef.current?.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderBackStatusBar title={t('settings.language')} />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    text: {
      fontSize: theme.typography.fontSize.MD,
      fontFamily: theme.typography.fontFamily.MEDIUM,
      color: theme.colors.textPrimary,
    },
  });

export default LanguageScreen;
