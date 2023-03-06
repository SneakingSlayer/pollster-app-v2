import React from 'react';

import { useSignUpMutation } from '../../../../redux/services/authServices';

import { Keyboard } from 'react-native';

interface UserValues {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

const userValuesNames = {
  firstname: 'firstname',
  lastname: 'lastname',
  email: 'email',
  username: 'username',
  password: 'password',
};

const initUserValues = {
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  password: '',
};

const initFocusValues = {
  firstname: false,
  lastname: false,
  email: false,
  username: false,
  password: false,
};

const useRegister = () => {
  const [userValues, setUserValues] =
    React.useState<UserValues>(initUserValues);
  const [userErrors, setUserErrors] =
    React.useState<UserValues>(initUserValues);

  const [success, setSuccess] = React.useState<boolean>(false);

  const [focusValues, setFocusValues] = React.useState(initFocusValues);

  const [signUp, { isLoading: loading }] = useSignUpMutation();

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

  const handleRegister = async () => {
    try {
      if (hasFieldsError()) return;
      Keyboard.dismiss();
      setUserErrors(initUserValues);
      setFocusValues(initFocusValues);
      const result = await signUp({ payload: userValues }).unwrap();
      setUserValues(initUserValues);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      const fieldErrors = (error as any)?.data?.msg;
      if (fieldErrors) {
        Object.entries(fieldErrors).map((field) => {
          setUserErrors((prev) => ({
            ...prev,
            [(field[1] as any).fieldName]: (field[1] as any).msg,
          }));
        });
      }
    }
  };

  const hasFieldsError = (): boolean => {
    let hasError = false;
    let errs = { ...userErrors };
    Object.entries(userValues).forEach((field) => {
      const fieldError = validate({
        name: field[0],
        value: field[1],
      });
      if (fieldError) hasError = true;
      errs = {
        ...errs,
        [field[0]]: fieldError,
      };
    });
    setUserErrors(errs);
    return hasError;
  };

  return {
    userValues,
    handleChange,
    handleRegister,
    userErrors,
    focusValues,
    handleBlur,
    handleFocus,
    loading,
    success,
    setSuccess,
  };
};

const validate = ({ name, value }: { name: string; value: string }): string => {
  switch (name) {
    case userValuesNames.firstname:
      if (!value) return 'First name is required.';
      if (value.length < 3) return 'Too short.';
      return '';
    case userValuesNames.lastname:
      if (!value) return 'Last name is required.';
      if (value.length < 3) return 'Too short.';
      return '';
    case userValuesNames.email:
      if (!value) return 'Email is required.';
      return '';
    case userValuesNames.username:
      if (!value) return 'Username is required.';
      return '';
    case userValuesNames.password:
      if (!value) return 'Password is required.';
      if (value.length < 7) return 'Too short.';
      return '';
    default:
      return '';
  }
};
export default useRegister;
