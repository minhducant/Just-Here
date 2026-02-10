import { ViewStyle, TextStyle } from 'react-native';
import normalize from 'react-native-normalize';

import { Theme } from '@/constants/theme';

type AuthStyles = {
  container: ViewStyle;
  copyRight: TextStyle;
  buttonLoginWith: ViewStyle;
  buttonLoginText: TextStyle;
};

export const authStyles = (theme: Theme): AuthStyles => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  copyRight: {
    fontFamily: theme.typography.fontFamily.REGULAR,
    fontSize: theme.typography.fontSize.SM,
    color: theme.colors.textMuted,
  },
  buttonLoginWith: {
    height: normalize(50),
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    marginTop: normalize(16),
    marginHorizontal: normalize(5),
    backgroundColor: theme.colors.surface,
  },
  buttonLoginText: {
    fontFamily: theme.typography.fontFamily.MEDIUM,
    fontSize: theme.typography.fontSize.SM,
    color: theme.colors.text,
    marginLeft: normalize(10),
  },
});
