import {
  setTheme,
  setLoading,
  setLanguage,
  setAppVersion,
  setHasCompletedOnboarding,
  resetAppState,
} from './app/store';

import { setUser, setTokens, updateUser, logout } from './user/store';

export const actions = {
  app: {
    setTheme,
    setLoading,
    setLanguage,
    setAppVersion,
    setHasCompletedOnboarding,
    resetAppState,
  },
  user: {
    setUser,
    setTokens,
    updateUser,
    logout,
  },
};
