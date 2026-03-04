import { ViewStyle, TextStyle } from 'react-native';
import normalize from 'react-native-normalize';

import { Theme } from '@/constants/theme';

type AuthStyles = {
  container: ViewStyle;
  copyRight: TextStyle;
  buttonLoginWith: ViewStyle;
  buttonLoginText: TextStyle;
  viewButton: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
};

export const authStyles = (theme: Theme): AuthStyles => ({
  container: {
    flex: 1,
    backgroundColor: '#0222FF',
  },
  copyRight: {
    fontFamily: theme.typography.fontFamily.REGULAR,
    fontSize: theme.typography.fontSize.SM,
    color: theme.colors.textMuted,
  },
  buttonLoginWith: {
    height: normalize(43),
    borderWidth: 1,
    borderColor: theme.colors.card,
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    marginTop: normalize(16),
    marginHorizontal: normalize(5),
    backgroundColor: theme.colors.card,
  },
  buttonLoginText: {
    fontFamily: theme.typography.fontFamily.BOLD,
    fontSize: theme.typography.fontSize.SM,
    color: theme.colors.text,
    marginLeft: normalize(10),
  },
  viewButton: {
    marginTop: 'auto',
    margin: normalize(20),
    borderRadius: normalize(20),
    padding: normalize(20),
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: normalize(28),
    fontFamily: theme.typography.fontFamily.BOLD,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: normalize(14),
    fontFamily: theme.typography.fontFamily.REGULAR,
    color: theme.colors.textMuted,
    marginTop: normalize(6),
    marginBottom: normalize(8),
  },
});
