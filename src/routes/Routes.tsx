import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Pages
import { Login } from '../screens/login/Login';
import { Home } from '../screens/public/Home';
import { Poll } from '../screens/public/Poll';
import { Profile } from '../screens/public/Profile';
import { Register } from '../screens/public/Register';
import { Search } from '../screens/public/Search';

import { UserTabRoutes } from './UserTabRoutes';
import { AdminTabRoutes } from './AdminTabRoutes';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuth } from '../redux/slices/authSlice';

import { createNavigationContainerRef } from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const Routes = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAuth());
    navigationRef.addListener('state', () => dispatch(getAuth()));
    return () =>
      navigationRef.removeListener('state', () => dispatch(getAuth()));
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!data?.token ? (
          <>
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        ) : null}

        {data?.token ? (
          data?.role === 'student' ? (
            <>
              <Stack.Screen
                name="route"
                component={UserTabRoutes}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="poll"
                component={Poll}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="search"
                component={Search}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="route"
                component={AdminTabRoutes}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="poll"
                component={Poll}
                options={{ headerShown: false }}
              />
            </>
          )
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
