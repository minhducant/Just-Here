import { AuthApi } from '@/api/auth';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  _id: string;
  user_id: string;
  name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  gender?: number;
  image_url?: string;
  status: 'ACTIVE' | 'INACTIVE';
  is_banned: boolean;
  is_deleted: boolean;
  last_login_at?: string;
  deleted_at?: string;
  createdAt: string;
  updatedAt: string;
  facebook_id?: string;
  google_id?: string;
  zalo_id?: string;
  apple_id?: string;
  line_id?: string;
  kakao_id?: string;
  x_id?: string;
  whatsapp_id?: string;
  wechat_id?: string;
  snapchat_id?: string;
}
export interface UserState {
  user: User | null;
  notifyCount: number;
  streak?: number;
  lastCheckinDate?: Date;
}

const initialState: UserState = {
  user: null,
  streak: 0,
  notifyCount: 0,
  lastCheckinDate: undefined,
};

const getUserInfo = createAsyncThunk('user/me', async () => {
  return await AuthApi.getUserInfo({});
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setNotifyCount(state, action: PayloadAction<number>) {
      state.notifyCount = action.payload;
    },
    setStreak(state, action: PayloadAction<number>) {
      state.streak = action.payload;
    },
    setLastCheckinDate(state, action: PayloadAction<Date>) {
      state.lastCheckinDate = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser, setNotifyCount, setStreak, setLastCheckinDate, updateUser, logout } =
  userSlice.actions;
export { getUserInfo };

export default userSlice.reducer;
