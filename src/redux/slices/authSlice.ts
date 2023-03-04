import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Auth {
  token: string | null;
  role: string;
  id: string | null;
  permissions: string[];
}

const initialState: Auth = {
  token: null,
  role: '',
  id: null,
  permissions: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      AsyncStorage.setItem('auth', JSON.stringify(action.payload));
      return { ...action.payload };
    },
    getAuth(state) {
      const auth = AsyncStorage.getItem('auth');

      if (auth) {
        Promise.resolve(auth)
          .then((value) => {
            if (value) {
              return { ...(JSON.parse(value) as Auth) };
            }
          })
          .catch((error) => {
            state = initialState;
          });
      }
    },
  },
});

export const { setAuth, getAuth } = authSlice.actions;

export default authSlice.reducer;
