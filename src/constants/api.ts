export const API_PREFIX = '/api/v1';
export const MAIN_DOMAIN = 'http://192.168.1.51:3343';

export const ApiUrl = {
  auth: {
    get_user_info: '/auth/me',
    delete_account: '/client',
    update_user_info: '/client',
    login_zalo: '/auth/social/zalo',
    login_apple: '/auth/social/apple',
    login_google: '/auth/social/google',
    login_facebook: '/auth/social/facebook',
    refresh_access_token: '/auth/client/refresh',
  },
};
