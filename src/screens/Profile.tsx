import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { globalStyles } from '../components/globalStyles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { RadioButton, ProgressBar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { BASE_URL } from '../utils/baseurl';
import { GlobalContext } from '../context/GlobalState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomColor } from '../utils/colors';
import { formatDate } from '../utils/dateformat';

export const Profile = ({ navigation }) => {
  const {
    fetchStart,
    fetchFinish,
    getCurrentUser,
    data,
    loading,
    handleLogout,
    authChecker,
  } = useContext(GlobalContext);
  const [user, setUser] = useState([]);
  const [votes, setVotes] = useState([]);
  /*useEffect(() => {
    getCurrentUser();
    fetchUser();
    fetchVotes();
  }, [loading]);

  const fetchUser = () => {
    fetch(BASE_URL.user + `/${data.id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${data.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVotes = () => {
    fetch(BASE_URL.votes + `/${data.id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${data.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVotes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const logout = navigation.addListener("focus", () => {
      authChecker();
    });
    return logout;
  }, [navigation]);*/

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.upper]}>
        {user.length > 0 ? (
          <View style={[{ position: 'relative', height: '100%' }]}>
            <View
              style={[
                {
                  position: 'absolute',
                  top: '13%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                },
              ]}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={25} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleLogout()}>
                <Text style={[globalStyles.fontLight, globalStyles.fontBold]}>
                  Sign out
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[{ position: 'absolute', bottom: '13%' }]}>
              <View style={[styles.profilePictureWrapper, { marginBottom: 5 }]}>
                <Text
                  style={[
                    globalStyles.fontBold,
                    { color: '#fff' },
                    globalStyles.fontTitle,
                  ]}
                >
                  {'user[0]?.firstname.charAt(0).toUpperCase()'}
                </Text>
              </View>
              <Text
                style={[
                  globalStyles.fontLight,
                  globalStyles.fontBold,
                  globalStyles.fontTitle,
                ]}
              >
                {"user[0].firstname + ' ' + user[0].lastname"}
              </Text>
              <Text style={[globalStyles.fontLight, globalStyles.fontBold]}>
                {'@' + 'user[0].username'}
                {' | ' + votes.length.toString() + ' votes'}
              </Text>
              <Text
                style={[
                  globalStyles.fontLight,
                  globalStyles.fontSm,

                  { marginTop: 10 },
                ]}
              >
                {'Joined ' + 'formatDate(user[0].date_created)'}
              </Text>
            </View>
          </View>
        ) : (
          <Text>User not found.</Text>
        )}
      </View>

      <View style={[styles.lower]}></View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },

  profilePictureWrapper: {
    backgroundColor: randomColor,
    width: '100%',
    height: '100%',
    maxWidth: 60,
    maxHeight: 60,

    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  upper: {
    height: '60%',
    backgroundColor: '#0066ff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  lower: {
    height: '40%',
    backgroundColor: '#fff',
  },
});
