import React, { useState, useContext } from 'react';
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

import { globalStyles } from '../../components/globalStyles/GlobalStyles';

export const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, msg: '' });

  const [firstFocused, setFirstFocused] = useState(false);
  const [lastFocused, setLastFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [userFocused, setUserFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelRegister = () => {
    setError({ status: false, msg: '' });
    if (
      fname === '' ||
      lname === '' ||
      username === '' ||
      email === '' ||
      password === ''
    ) {
      setError({ status: true, msg: 'Fill all empty fields.' });
      return;
    }
    const body = {
      firstname: fname,
      lastname: lname,
      email: email,
      username: username,
      password: password,
    };
    fetch(BASE_URL.register, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          setError({ status: true, msg: data.msg });
          return;
        }
        navigation.navigate('login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <></>;
};

{
  /**  <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          style={styles.logo}
          source={require('../assets/logos/login-logo.png')}
        />
      </View>
      {error.status ? (
        <View>
          <Text
            style={[
              { textAlign: 'center', marginBottom: 20 },
              globalStyles.fontDanger,
              globalStyles.fontItalic,
            ]}
          >
            {error.msg}
          </Text>
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          placeholder="First name"
          style={
            firstFocused
              ? [styles.inputFocused, { width: '48.5%' }]
              : [styles.formInput, { width: '48.5%' }]
          }
          onFocus={() => setFirstFocused(true)}
          onBlur={() => setFirstFocused(false)}
          defaultValue={fname}
          onChangeText={(e) => setFname(e)}
        />
        <TextInput
          placeholder="Last name"
          style={
            lastFocused
              ? [styles.inputFocused, { width: '48.5%' }]
              : [styles.formInput, { width: '48.5%' }]
          }
          onFocus={() => setLastFocused(true)}
          onBlur={() => setLastFocused(false)}
          defaultValue={lname}
          onChangeText={(e) => setLname(e)}
        />
      </View>
      <TextInput
        placeholder="Username"
        style={userFocused ? styles.inputFocused : styles.formInput}
        onFocus={() => setUserFocused(true)}
        onBlur={() => setUserFocused(false)}
        defaultValue={username}
        onChangeText={(e) => setUsername(e)}
      />
      <TextInput
        style={styles.formInput}
        placeholder="Outlook Email"
        style={emailFocused ? styles.inputFocused : styles.formInput}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        defaultValue={email}
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        style={styles.formInput}
        placeholder="Password"
        secureTextEntry={true}
        style={passFocused ? styles.inputFocused : styles.formInput}
        onFocus={() => setPassFocused(true)}
        onBlur={() => setPassFocused(false)}
        defaultValue={password}
        onChangeText={(e) => setPassword(e)}
      />

      <TouchableOpacity
        style={loading ? styles.disabledButton : styles.formButton}
        disabled={loading ? true : false}
        onPress={handelRegister}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.center}>
        Already have an account?{' '}
        <Text
          style={styles.textButton}
          onPress={() => navigation.navigate('login')}
        >
          Sign in here
        </Text>
      </Text>
    </SafeAreaView>*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  formInput: {
    height: 50,
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#777',
  },
  inputFocused: {
    height: 50,
    borderRadius: 15,
    marginBottom: 10,
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
});
