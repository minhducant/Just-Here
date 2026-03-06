export const API_PREFIX = '/api/v1';

// export const MAIN_DOMAIN = 'http://192.168.1.51:3343';
export const MAIN_DOMAIN = 'http://13.21.34.146:3343';

export const ApiUrl = {
  auth: {
    me: '/auth/me',
    login: {
      zalo: '/auth/social/zalo',
      apple: '/auth/social/apple',
      google: '/auth/social/google',
      facebook: '/auth/social/facebook',
    },
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',
  },
  users: {
    base: '/user',
    me: '/user/me',
  },
};
