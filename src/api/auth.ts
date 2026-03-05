import { ApiUrl } from '@/constants/api';
import { client } from '@/api/apiClient';
import { extraParams } from '@/utils/apiResponse';
import { AppApiTypeRequest } from '@/api/typeRequest';

export class AuthApi {
  static async getUserInfo(params: any) {
    const response = await client.get(ApiUrl.users.me + extraParams(params));
    console.log('getUserInfo response: ', JSON.stringify(response, null, 2));
    return response.data;
  }
  static async LoginFacebook(params: AppApiTypeRequest.LoginFacebook) {
    const response = await client.post(ApiUrl.auth.login.facebook, params);
    return response;
  }
  static async LoginGoogle(params: AppApiTypeRequest.LoginGoogle) {
    const response = await client.post(ApiUrl.auth.login.google, params);
    return response;
  }
  static async LoginZalo(params: AppApiTypeRequest.LoginZalo) {
    const response = await client.post(ApiUrl.auth.login.zalo, params);
    return response;
  }
  static async LoginApple(params: AppApiTypeRequest.LoginApple) {
    const response = await client.post(ApiUrl.auth.login.apple, params);
    return response;
  }
  static async DeletedAccount(params: any) {
    const response = await client.delete(`${ApiUrl.users.base}/${params}`);
    return response;
  }
  static async UpdateUserInfo(_id: string, params: any) {
    const response = await client.patch(`${ApiUrl.users.base}/${_id}`, params);
    return response;
  }
}
