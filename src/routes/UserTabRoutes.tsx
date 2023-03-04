import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { Votes } from '../screens/Votes';
import { Search } from '../screens/Search';
import { Header } from '../components/header/Header';
import { NewPoll } from '../screens/adminScreens/NewPoll';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AccessControl } from '../utils/accesscontrol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from '../context/GlobalState';
const Tab = createBottomTabNavigator();
export const UserTabRoutes = () => {
  const { getCurrentUser, data, loading } = useContext(GlobalContext);
  useEffect(() => {
    getCurrentUser();
  }, [loading]);
  // console.log(data);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 50, paddingBottom: 10, paddingTop: 10 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerStyle: { borderBottomWidth: 0.5, borderColor: '#ddd' },
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerTitle: () => <Header />,

          tabBarLabel: 'Home',
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
          tabBarLabel: 'Search',
          tabBarShowLabel: false,
        }}
      />
      {!data ? null : data.permissions.includes(AccessControl.can_add_polls) ? (
        <Tab.Screen
          name="Add a Poll"
          component={NewPoll}
          options={{
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus-square" size={size} color={color} />
            ),
            tabBarLabel: 'Add Poll',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
            tabBarShowLabel: false,
          }}
        />
      ) : null}
      <Tab.Screen
        name="Votes"
        component={Votes}
        options={{
          headerShown: true,

          tabBarIcon: ({ color, size }) => (
            <Icon name="check" size={size} color={color} />
          ),
          tabBarShowLabel: false,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-alt" size={size} color={color} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};
