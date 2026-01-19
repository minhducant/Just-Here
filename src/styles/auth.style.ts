import normalize from 'react-native-normalize';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';

export const authStyle: any = {
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  copyRight: {
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 14,
  },
  buttonLoginWith: {
    height: normalize(50),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.SILVER,
    borderRadius: normalize(10),
    marginHorizontal: normalize(5),
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    marginTop: normalize(16),
  },
  buttonLoginText: {
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 14,
    color: color.BLACK,
    marginLeft: normalize(10),
  },
};
