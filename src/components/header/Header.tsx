import React, { useContext, useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { randomColor } from '../../utils/colors';
import { globalStyles } from '../globalStyles/GlobalStyles';

import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';

import Icon from 'react-native-vector-icons/FontAwesome5';

export const Header = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Image
            style={styles.headerLogo}
            source={require('../../assets/logos/logolandscape.png')}
          />
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text>
            <Icon name="share" size={20} color="#008CFF" />{' '}
          </Text>
        </TouchableOpacity>
        {/** <View style={[styles.profilePictureWrapper]}>
          <Text style={[globalStyles.fontLight, globalStyles.fontBold]}>
            {
              'user.length > 0 ? user[0].firstname.charAt(0).toUpperCase() : null'
            }
          </Text>
        </View>
       <TouchableOpacity
          style={styles.search}
          onPress={() => navigation.navigate("search")}
        >
          <Icon name="search" size={20} color="#008CFF" />
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

    height: '100%',

    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  logoWrapper: {
    width: '100%',
    maxWidth: 140,
    height: '100%',
    maxHeight: 60,
    aspectRatio: 1 * 1.4,
  },
  headerLogo: { resizeMode: 'contain', width: '100%', height: '100%' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
  },
  profilePictureWrapper: {
    backgroundColor: randomColor,
    width: '100%',
    height: '100%',
    maxWidth: 35,
    maxHeight: 35,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
