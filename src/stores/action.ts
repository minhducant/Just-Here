import {
  setTheme,
  setLanguage,
  setAppVersion,
  setHasCompletedOnboarding,
  resetAppState,
} from './app/store';

import { setUser, setTokens, setLoading, updateUser, logout } from './user/store';

export const actions = {
  app: {
    setTheme,
    setLanguage,
    setAppVersion,
    setHasCompletedOnboarding,
    resetAppState,
  },
  user: {
    setUser,
    setTokens,
    setLoading,
    updateUser,
    logout,
  },
};
