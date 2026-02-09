export const Colors = {
  WHITE: '#FFFFFF',
  IRON: '#DEE0E2',
  NEVADA: '#626A72',
  HOKI: '#6282A2',
  DUSTY_GRAY: '#999999',
  EBONY_CLAY: '#21313F',
  BLACK: '#000000',
  PICTON_BLUE: '#58B5E4',
  CRIMSON: '#EF1719',
  TURBO: '#FCE205',
  SUN_FLOWER: '#E6CE37',
  FUN_BLUE: '#174697',
  PASTEL_GREEN: '#72ED61',
  PURPLE: '#40FF00',
  BLUE: '#152CEF',
  ORANGE: '#ffa726',
  SILVER: '#c9c9c9',
  SILVERC4: '#C4C4C4',
  MONZA: '#C3002F',
  TERRACOTTA: '#E7685E',
  WOODSMOKE: '#181A1E',
  ALABASTER: '#F7F7F7',
  GALLERY: '#efefef',
  ROYALBLUE: '#3578E5',
  DODGESBLUE: '#3a75ff',
  ALTO: '#DFDFDF',
  MANTIS: '#61BD4F',
  SULITUDE: '#E7F3FF',
  GRAYCHATEAU: '#A5A6A7',
  SEASHELL: '#F1F1F1',
  BOULDER: '#7B7B7B',
  MYSTIC: '#DFE3EB',
  VIOLET: '#85517D',
  LIGHT_GRAY: '#f2f2f2',
  HEIGHT_BLUE: '#05399F',
  MAIN: '#4abeaf',
};

export const FontFamily = {
  REGULAR: 'PlusJakartaSans-Regular',
  SEMIBOLD: 'PlusJakartaSans-SemiBold',
  BOLD: 'PlusJakartaSans-Bold',
};

export const FontSize = {
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
  XXXL: 28,
};

export const LineHeight = {
  SM: 18,
  MD: 22,
  LG: 26,
  XL: 30,
};

export type ThemeMode = 'light' | 'dark';

export const lightTheme = {
  mode: 'light' as ThemeMode,
  colors: {
    background: Colors.WHITE,
    surface: Colors.ALABASTER,
    card: Colors.GALLERY,
    textPrimary: Colors.BLACK,
    textSecondary: Colors.NEVADA,
    textMuted: Colors.DUSTY_GRAY,
    border: Colors.ALTO,
    divider: Colors.LIGHT_GRAY,
    primary: Colors.MAIN,
    secondary: Colors.ROYALBLUE,
    danger: Colors.CRIMSON,
    warning: Colors.ORANGE,
    success: Colors.MANTIS,
  },
};

export const darkTheme = {
  mode: 'dark' as ThemeMode,
  colors: {
    background: Colors.WOODSMOKE,
    surface: Colors.EBONY_CLAY,
    card: '#1F2228',
    textPrimary: Colors.WHITE,
    textSecondary: Colors.GRAYCHATEAU,
    textMuted: Colors.BOULDER,
    border: '#2A2E35',
    divider: '#2F333A',
    primary: Colors.MAIN,
    secondary: Colors.DODGESBLUE,
    danger: Colors.CRIMSON,
    warning: Colors.ORANGE,
    success: Colors.PASTEL_GREEN,
  },
};

export const typography = {
  fontFamily: FontFamily,
  fontSize: FontSize,
  lineHeight: LineHeight,
};

export const getTheme = (mode: ThemeMode) => {
  return {
    ...(mode === 'dark' ? darkTheme : lightTheme),
    typography,
  };
};

export type AppTheme = ReturnType<typeof getTheme>;
