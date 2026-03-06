import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, useColorScheme, StyleSheet, TouchableOpacity } from 'react-native';

import { changeLanguage } from '@/i18n';
import { getTheme } from '@/constants/theme';
import { DataLanguage } from '@/utils/deviceLang';
import { navigationRef } from '@/navigation/rootNavigation';
import HeaderBackStatusBar from '@/components/header/HeaderBack';

const LanguageScreen = () => {
  const { t, i18n } = useTranslation();
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark' ? 'dark' : 'light');
  const styles = createStyles(theme);
  const currentLang = useMemo(() => i18n.language?.slice(0, 2), [i18n.language]);

  const onChangeLanguage = async (lang: string) => {
    if (lang === currentLang) {
      navigationRef.current?.goBack();
      return;
    }
    changeLanguage(lang);
    navigationRef.current?.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderBackStatusBar title={t('settings.language')} />
      <View style={styles.list}>
        {DataLanguage.map(item => {
          const isActive = currentLang === item.value;
          return (
            <TouchableOpacity
              key={item.value}
              style={styles.item}
              onPress={() => onChangeLanguage(item.value)}
            >
              <Text style={styles.text}>{item.label}</Text>
              {isActive && <View style={styles.dot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    list: {
      paddingHorizontal: 16,
      paddingTop: 12,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    text: {
      fontSize: theme.typography.fontSize.MD,
      fontFamily: theme.typography.fontFamily.MEDIUM,
      color: theme.colors.textPrimary,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.primary,
    },
  });

export default LanguageScreen;
