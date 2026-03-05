import {
  setTheme,
  setLoading,
  setLanguage,
  setAppVersion,
  setIsLoggedIn,
  setHasCompletedOnboarding,
  resetAppState,
} from './app/store';

import {
  logout,
  setUser,
  setStreak,
  updateUser,
  setNotifyCount,
  setLastCheckinDate,
} from './user/store';

export const actions = {
  app: {
    setTheme,
    setLoading,
    setLanguage,
    setAppVersion,
    setIsLoggedIn,
    setHasCompletedOnboarding,
    resetAppState,
  },
  user: {
    logout,
    setUser,
    setStreak,
    updateUser,
    setNotifyCount,
    setLastCheckinDate,
  },
};
