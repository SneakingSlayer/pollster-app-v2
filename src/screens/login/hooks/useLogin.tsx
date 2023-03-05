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

interface ErrorResponse {
  data: { msg: { fieldName: string; msg: string } };
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
      if (!userValues.username || !userValues.password) return '';
      Keyboard.dismiss();
      setUserErrors(initUserValues);
      setFocusValues(initFocusValues);
      const result = await signIn({ payload: userValues }).unwrap();
      setUserValues(initUserValues);
      dispatch(setAuth(result));
      console.log('Sign in success!');
    } catch (error) {
      const fieldName = (error as ErrorResponse)?.data?.msg?.fieldName;
      const message = (error as ErrorResponse)?.data?.msg?.msg;
      if (fieldName && message) {
        setUserErrors((prev) => ({
          ...prev,
          [fieldName]: message,
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
