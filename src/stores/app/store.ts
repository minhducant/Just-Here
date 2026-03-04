import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeType = 'light' | 'dark';
export type LanguageType = 'vi' | 'en' | 'ko';

export interface AppState {
  theme: ThemeType;
  appVersion: string;
  language: LanguageType;
  hasCompletedOnboarding: boolean;
}

const initialState: AppState = {
  theme: 'light',
  language: 'vi',
  appVersion: '1.0.0',
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
    resetAppState: () => initialState,
  },
});

export const { setTheme, setLanguage, setAppVersion, resetAppState, setHasCompletedOnboarding } =
  appSlice.actions;

export default appSlice.reducer;
