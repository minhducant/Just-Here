import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeType = 'light' | 'dark';
export type LanguageType = 'vi' | 'en' | 'ko';

export interface AppState {
  theme: ThemeType;
  loading: boolean;
  appVersion: string;
  isLoggedIn: boolean;
  language: LanguageType;
  hasCompletedOnboarding: boolean;
}

const initialState: AppState = {
  theme: 'light',
  loading: false,
  language: 'vi',
  appVersion: '1.0.0',
  isLoggedIn: false,
  hasCompletedOnboarding: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHasCompletedOnboarding(state, action: PayloadAction<boolean>) {
      state.hasCompletedOnboarding = action.payload;
    },
    setTheme(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<LanguageType>) {
      state.language = action.payload;
    },
    setAppVersion(state, action: PayloadAction<string>) {
      state.appVersion = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    resetAppState: () => initialState,
  },
});

export const {
  setTheme,
  setLanguage,
  setAppVersion,
  setLoading,
  setIsLoggedIn,
  resetAppState,
  setHasCompletedOnboarding,
} = appSlice.actions;

export default appSlice.reducer;
