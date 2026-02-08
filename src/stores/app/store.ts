import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeType = 'light' | 'dark';

export interface AppState {
  isFirstUse: boolean;
  theme: ThemeType;
  language: string;
  appVersion: string;
}

const initialState: AppState = {
  isFirstUse: true,
  theme: 'light',
  language: 'vi',
  appVersion: '1.0.0',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsFirstUse(state, action: PayloadAction<boolean>) {
      state.isFirstUse = action.payload;
    },
    setTheme(state, action: PayloadAction<ThemeType>) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setAppVersion(state, action: PayloadAction<string>) {
      state.appVersion = action.payload;
    },
    resetAppState() {
      return initialState;
    },
  },
});

export const {
  setIsFirstUse,
  setTheme,
  setLanguage,
  setAppVersion,
  resetAppState,
} = appSlice.actions;

export default appSlice.reducer;
