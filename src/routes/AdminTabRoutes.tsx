import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NewPoll } from '../screens/private/NewPoll';
import { Polls } from '../screens/private/Polls';
import { Users } from '../screens/private/Users';
import { Search } from '../screens/public/Search';
import { Profile } from '../screens/public/Profile';
import { Header } from '../components/header/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();
export const AdminTabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 10 },
      }}
    >
      <Tab.Screen
        name="Polls"
        component={Polls}
        options={{
          headerShown: true,
          headerStyle: { borderBottomWidth: 0.5, borderColor: '#ddd' },
          tabBarIcon: ({ color, size }) => (
            <Icon name="vote-yea" size={size} color={color} />
          ),
          headerTitle: () => <Header />,
          tabBarLabel: 'Polls',
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
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-friends" size={size} color={color} />
          ),
          tabBarLabel: 'Users',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          tabBarShowLabel: false,
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
