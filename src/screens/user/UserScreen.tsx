import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';

import { getTheme } from '@/constants/theme';
import { logOut, useAccount } from '@/utils';
import { navigationRef } from '@/navigation/rootNavigation';
import {
  IconBug,
  IconRating,
  IconLogout,
  IconLanguage,
  IconSettings,
  IconReminder,
} from '@/assets/icons';

const UserScreen = () => {
  const { t } = useTranslation();
  const { user } = useAccount();
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark' ? 'dark' : 'light');
  const styles = createStyles(theme);
  const [faceId, setFaceId] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.profile}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.name}>{user?.name || 'Guest'}</Text>
            <Text style={styles.edit}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowText}>{t('settings.face_id')}</Text>
            <Switch value={faceId} onValueChange={setFaceId} />
          </View>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowText}>{t('settings.appearance')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigationRef?.current?.navigate('LanguageScreen')}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.rowText}>{t('settings.language')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <IconReminder />
              <Text style={styles.rowText}>{t('settings.reminder')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>{t('settings.resources')}</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <IconSettings />
              <Text style={styles.rowText}>{t('settings.request_feature')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <IconBug />
              <Text style={styles.rowText}>{t('settings.report_bug')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowLeft}>
              <IconRating />
              <Text style={styles.rowText}>{t('settings.rate_app')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logout} onPress={logOut}>
          <IconLogout />
          <Text style={styles.logoutText}>{t('settings.logout')}</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('settings.terms_of_service')}</Text>
          <Text style={styles.footerText}>Just Here</Text>
          <Text style={styles.footerText}>{t('settings.version')} 1.0.1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    profile: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 24,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: theme.colors.border,
    },
    name: {
      fontSize: theme.typography.fontSize.MD,
      fontFamily: theme.typography.fontFamily.SEMIBOLD,
      color: theme.colors.textPrimary,
    },
    edit: {
      fontSize: theme.typography.fontSize.SM,
      fontFamily: theme.typography.fontFamily.REGULAR,
      color: theme.colors.textSecondary,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.SM,
      color: theme.colors.textMuted,
      marginBottom: 8,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    rowText: {
      fontSize: theme.typography.fontSize.MD,
      fontFamily: theme.typography.fontFamily.MEDIUM,
      color: theme.colors.textPrimary,
    },
    rowRight: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.fontFamily.REGULAR,
    },
    logout: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderColor: theme.colors.divider,
    },
    logoutText: {
      fontSize: theme.typography.fontSize.MD,
      fontFamily: theme.typography.fontFamily.MEDIUM,
      color: theme.colors.textPrimary,
    },
    footer: {
      marginTop: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
    },
    footerText: {
      fontSize: theme.typography.fontSize.XS,
      color: theme.colors.textMuted,
    },
  });
