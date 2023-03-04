import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Poll } from '../../components/poll/Poll';
import { Header } from '../../components/header/Header';
import { Category } from '../../components/category/Category';
import { globalStyles } from '../../components/globalStyles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { GlobalContext } from '../../context/GlobalState';
import { BASE_URL } from '../../utils/baseurl';
import { AdminPoll } from '../../components/adminPoll/AdminPoll';
export const Polls = ({ navigation }) => {
  const { data, getCurrentUser, loading, authChecker } =
    useContext(GlobalContext);
  useEffect(() => {
    getCurrentUser();
  }, []);

  const [polls, setPolls] = useState([]);

  const renderItem = ({ item }) => (
    <View>
      <AdminPoll
        title={item.title}
        description={item.description}
        firstname={item.firstname}
        lastname={item.lastname}
        votes={item.totalVotes}
        id={item._id}
        choices={item.choices}
        date={item.date_created}
        img={item.img}
      />
    </View>
  );

  useEffect(() => {
    const logout = navigation.addListener('focus', () => {
      authChecker();
    });
    return logout;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {polls.length > 0 ? (
        <FlatList
          style={styles.pollsWrapper}
          data={polls}
          renderItem={renderItem}
          keyExtractor={(poll) => poll._id}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  pollsWrapper: {
    paddingTop: 15,
  },
  formInput: {
    height: 50,
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  choice: {
    height: 50,
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formInputMulti: {
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  form: {
    padding: 20,
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
});
