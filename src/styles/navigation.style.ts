import { Platform, ViewStyle, TextStyle } from 'react-native';
import normalize from 'react-native-normalize';

import { Theme } from '@/constants/theme';

type Styles = {
  tabBar: ViewStyle;
  label: TextStyle;
};

export const navigationStyles = (theme: Theme): Styles => ({
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.border,
    borderTopWidth: 0.5,
    height: Platform.OS === 'ios' ? 84 : 60,
    paddingBottom: Platform.OS === 'ios' ? 26 : 8,
    paddingTop: normalize(6),
    shadowColor: theme.colors.border,
    elevation: 0,
  },
  label: {
    fontFamily: theme.typography.fontFamily.SEMIBOLD,
    fontSize: theme.typography.fontSize.XS,
  },
});
