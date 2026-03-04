import { ApiUrl } from '@/constants/api';
import { client } from '@/api/apiClient';
import { extraParams } from '@/utils/apiResponse';
import { AppApiTypeRequest } from '@/api/typeRequest';

export class AuthApi {
  static async getUserInfo(params: any) {
    const response = await client.get(ApiUrl.auth.get_user_info + extraParams(params));
    return response.data;
  }
  static async LoginFacebook(params: AppApiTypeRequest.LoginFacebook) {
    const response = await client.post(ApiUrl.auth.login_facebook, params);
    return response;
  }
  static async LoginGoogle(params: AppApiTypeRequest.LoginGoogle) {
    const response = await client.post(ApiUrl.auth.login_google, params);
    return response;
  }
  static async LoginZalo(params: AppApiTypeRequest.LoginZalo) {
    const response = await client.post(ApiUrl.auth.login_zalo, params);
    return response;
  }
  static async LoginApple(params: AppApiTypeRequest.LoginApple) {
    const response = await client.post(ApiUrl.auth.login_apple, params);
    return response;
  }
  static async DeletedAccount(params: any) {
    const response = await client.delete(`${ApiUrl.auth.delete_account}/${params}`);
    return response;
  }
  static async UpdateUserInfo(_id: string, params: any) {
    const response = await client.patch(`${ApiUrl.auth.update_user_info}/${_id}`, params);
    return response;
  }
}
