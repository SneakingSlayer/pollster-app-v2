import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { globalStyles } from '../../../components/globalStyles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

import FormInput from '../../../components/inputs/FormInput';
import useRegister from './hooks/useRegister';
import Footer from '../../../components/footer/Footer';
export const Register = ({ navigation }: any) => {
  const {
    handleChange,
    userValues,
    userErrors,
    handleRegister,
    focusValues,
    handleBlur,
    handleFocus,
    loading,
    success,
    setSuccess,
  } = useRegister();

  const inputStyle = (focus: boolean, errors: string) => {
    if (errors) return styles.inputError;
    return focus ? styles.inputFocused : styles.formInput;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {success ? (
          <View style={styles.successContainer}>
            <Icon name="check-circle-o" size={150} color="#45e675" />
            <Text style={{ color: '#45e675', fontWeight: '700', fontSize: 32 }}>
              Congratulations!
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSuccess(false);
                navigation.navigate('login');
              }}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={require('../../../assets/logos/login-logo.png')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'flex-end',
              }}
            >
              <View style={{ flex: 1 }}>
                <FormInput
                  placeholder="First name"
                  style={inputStyle(
                    focusValues.firstname,
                    userErrors.firstname
                  )}
                  onFocus={() => handleFocus('firstname')}
                  onBlur={() => handleBlur('firstname')}
                  defaultValue={userValues.firstname}
                  name="firstname"
                  onChangeText={handleChange}
                  errors={userErrors.firstname}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput
                  placeholder="Last name"
                  style={inputStyle(focusValues.lastname, userErrors.lastname)}
                  onFocus={() => handleFocus('lastname')}
                  onBlur={() => handleBlur('lastname')}
                  defaultValue={userValues.lastname}
                  name="lastname"
                  onChangeText={handleChange}
                  errors={userErrors.lastname}
                />
              </View>
            </View>
            <FormInput
              placeholder="Username"
              style={inputStyle(focusValues.username, userErrors.username)}
              onFocus={() => handleFocus('username')}
              onBlur={() => handleBlur('username')}
              defaultValue={userValues.username}
              name="username"
              onChangeText={handleChange}
              errors={userErrors.username}
            />
            <FormInput
              placeholder="Email address"
              style={inputStyle(focusValues.email, userErrors.email)}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              defaultValue={userValues.email}
              name="email"
              onChangeText={handleChange}
              errors={userErrors.email}
            />
            <FormInput
              placeholder="Password"
              secureTextEntry={true}
              style={inputStyle(focusValues.password, userErrors.password)}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              defaultValue={userValues.password}
              name="password"
              onChangeText={handleChange}
              errors={userErrors.password}
            />

            <TouchableOpacity
              style={loading ? styles.disabledButton : styles.formButton}
              disabled={loading ? true : false}
              onPress={handleRegister}
            >
              <Text style={styles.buttonText}>
                {loading ? (
                  <ActivityIndicator size="small" color={'#000'} />
                ) : (
                  'Sign Up'
                )}
              </Text>
            </TouchableOpacity>
          </>
        )}
        <Text style={styles.center}>
          Already have an account?{' '}
          <Text
            style={styles.textButton}
            onPress={() => navigation.navigate('login')}
          >
            Sign in here
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
    overflow: 'hidden',
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
  inputError: {
    height: 55,
    borderRadius: 15,
    marginBottom: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#cf2343',
    color: '#cf2343',
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
  successContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
});
