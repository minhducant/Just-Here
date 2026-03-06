import React from 'react';
import normalize from 'react-native-normalize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StatusBar, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';

import { getTheme } from '@/constants/theme';
import { IconLibrary } from '@/components/base/iconLibrary';
import { navigationRef } from '@/navigation/rootNavigation';

interface HeaderProps {
  title: string;
  actionLeft?: () => void;
}

export default function HeaderBack({ title = '', actionLeft }: HeaderProps) {
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark' ? 'dark' : 'light');
  const styles = createStyles(theme);

  const _onGoBack = () => {
    if (navigationRef.current?.canGoBack()) {
      navigationRef.current.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.backBtn} onPress={actionLeft || _onGoBack}>
          <IconLibrary
            library="Ionicons"
            name="chevron-back"
            size={25}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.spacer} />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: normalize(16),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: normalize(12),
    },
    backBtn: {
      width: normalize(28, 'height'),
      height: normalize(28, 'height'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: normalize(10),
      marginRight: normalize(8),
    },
    spacer: {
      width: normalize(28, 'height'),
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: theme.typography.fontSize.MD,
      fontFamily: theme.typography.fontFamily.BOLD,
      color: theme.colors.textPrimary,
    },
  });
