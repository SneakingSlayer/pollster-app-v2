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
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { globalStyles } from '../../../components/globalStyles/GlobalStyles';

import FormInput from '../../../components/inputs/FormInput';

import useLogin from './hooks/useLogin';

import Footer from '../../../components/footer/Footer';
import { useNavigation } from '@react-navigation/native';
import { Navigation } from '../../../types/globalTypes';

export const Login = () => {
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

  const { navigate } = useNavigation<Navigation>();

  const inputStyle = (focus: boolean, errors: string) => {
    if (errors) return styles.inputError;
    return focus ? styles.inputFocused : styles.formInput;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.logoWrapper}>
          <Image
            style={styles.logo}
            source={require('../../../assets/logos/login-logo.png')}
          />
        </View>
        <FormInput
          errors={userErrors.username}
          name="username"
          placeholder="Email or username"
          style={inputStyle(focusValues.username, userErrors.username)}
          onFocus={() => handleFocus('username')}
          onBlur={() => handleBlur('username')}
          defaultValue={userValues.username}
          onChangeText={handleChange}
        />
        <FormInput
          errors={userErrors.password}
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
          <Text style={styles.buttonText}>
            {loading ? (
              <ActivityIndicator size="small" color={'#000'} />
            ) : (
              'Sign In'
            )}
          </Text>
        </TouchableOpacity>

        <Text style={styles.center}>
          Don't have an account?{' '}
          <Text style={styles.textButton} onPress={() => navigate('Register')}>
            Sign up here
          </Text>
        </Text>
      </View>
      <Footer />
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
  formError: {
    color: '#cf2343',
    fontSize: 12,
    padding: 8,
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
