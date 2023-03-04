import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { BASE_URL } from '../../utils/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { globalStyles } from '../../components/globalStyles/GlobalStyles';

import FormInput from '../../components/inputs/FormInput';

import useLogin from './hooks/useLogin';

export const Login = ({ navigation }: any) => {
  const {
    userValues,
    handleChange,
    handleLogin,
    loading,
    handleFocus,
    userErrors,
    focusValues,
    handleBlur,
  } = useLogin();

  const inputStyle = (focus: boolean, errors: string) => {
    if (errors) return styles.inputError;
    return focus ? styles.inputFocused : styles.formInput;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={require('../../assets/logos/login-logo.png')}
        />
      </View>
      <FormInput
        name="username"
        placeholder="Username"
        style={inputStyle(focusValues.username, userErrors.username)}
        onFocus={() => handleFocus('username')}
        onBlur={() => handleBlur('username')}
        defaultValue={userValues.username}
        onChangeText={handleChange}
      />
      <FormInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        style={inputStyle(focusValues.password, userErrors.password)}
        onFocus={() => handleFocus('password')}
        onBlur={() => handleBlur('password')}
        defaultValue={userValues.password}
        onChangeText={handleChange}
      />

      <TouchableOpacity
        style={loading ? styles.disabledButton : styles.formButton}
        onPress={handleLogin}
        disabled={loading ? true : false}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.center}>
        Don't have an account?{' '}
        <Text
          style={styles.textButton}
          onPress={() => navigation.navigate('register')}
        >
          Sign up here
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  formInput: {
    height: 55,
    borderRadius: 15,
    marginBottom: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#777',
  },
  inputFocused: {
    height: 55,
    borderRadius: 15,
    marginBottom: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#008CFF',
    color: '#008CFF',
  },
  inputError: {
    height: 55,
    borderRadius: 15,
    marginBottom: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#cf2343',
    color: '#cf2343',
  },
  formButton: {
    marginTop: 5,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#008CFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  textButton: {
    color: '#008CFF',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
  },
  logo: {
    height: 129,
    width: 136,
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  disabledButton: {
    marginTop: 5,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#008CFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
    opacity: 0.1,
  },
});
