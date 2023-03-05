import React, { useEffect } from 'react';

import { Keyboard } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSignInMutation } from '../../../redux/services/authServices';
import { useAppDispatch } from '../../../redux/hooks';
import { setAuth } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

interface UserValues {
  username: string;
  password: string;
}

const initUserValues = {
  username: '',
  password: '',
};

const initFocusValues = {
  username: false,
  password: false,
};

const useLogin = () => {
  const [userValues, setUserValues] =
    React.useState<UserValues>(initUserValues);

  const [userErrors, setUserErrors] =
    React.useState<UserValues>(initUserValues);

  const [focusValues, setFocusValues] = React.useState(initFocusValues);

  const [signIn, { data, isLoading: loading }] = useSignInMutation();

  const dispatch = useDispatch();

  const handleChange = (e: string, name: string) => {
    setUserValues((prev) => ({ ...prev, [name]: e }));
  };

  const handleFocus = (name: string) =>
    setFocusValues((prev) => ({
      ...prev,
      [name]: true,
    }));

  const handleBlur = (name: string) =>
    setFocusValues((prev) => ({
      ...prev,
      [name]: false,
    }));

  const handleLogin = async () => {
    try {
      Keyboard.dismiss();
      setUserErrors(initUserValues);
      setFocusValues(initFocusValues);
      const result = await signIn({ payload: userValues }).unwrap();
      setUserValues(initUserValues);
      dispatch(setAuth(result));
      console.log('Sign in success!');
    } catch (error: any) {
      if (error) {
        setUserErrors((prev) => ({
          ...prev,
          [error?.data?.msg?.fieldName ?? 'username']: error?.data?.msg?.msg,
        }));
      }
    }
  };

  return {
    userValues,
    handleChange,
    handleLogin,
    loading,
    handleFocus,
    userErrors,
    focusValues,
    handleBlur,
  };
};

export default useLogin;
