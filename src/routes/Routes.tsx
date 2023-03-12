import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Pages
import { Login } from '../screens/public/login/Login';
import { Home } from '../screens/public/Home';
import { Poll } from '../screens/public/Poll';
import { Profile } from '../screens/public/Profile';
import { Register } from '../screens/public/register/Register';
import { Search } from '../screens/public/Search';

import { UserTabRoutes } from './UserTabRoutes';
import { AdminTabRoutes } from './AdminTabRoutes';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAuth } from '../redux/slices/authSlice';

import { createNavigationContainerRef } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';

export type PollNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Poll'
>;

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Search: undefined;
  Route: undefined;
  Poll: { _id: string };
};

const navigationRef = createNavigationContainerRef();

const Stack = createStackNavigator<RootStackParamList>();
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
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        ) : null}

        {data?.token ? (
          data?.role === 'student' ? (
            <>
              <Stack.Screen
                name="Route"
                component={UserTabRoutes}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Poll"
                component={Poll}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Route"
                component={AdminTabRoutes}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Poll"
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
