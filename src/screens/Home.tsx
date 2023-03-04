import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { Poll } from '../components/poll/Poll';
import { Header } from '../components/header/Header';
import { Category } from '../components/category/Category';
import { BASE_URL } from '../utils/baseurl';
import { GlobalContext } from '../context/GlobalState';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const Home = () => {
  const Tab = createBottomTabNavigator();
  const [polls, setPolls] = useState([]);
  const [votes, setVotes] = useState([]);
  const { loading, getCurrentUser, data, authChecker } =
    useContext(GlobalContext);

  const fetchPolls = () => {
    fetch(BASE_URL.polls, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPolls(data.polls);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVotes = () => {
    fetch(BASE_URL.votes + `/${data.id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVotes(data);
        //  console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPolls();
    fetchVotes();
    getCurrentUser();
  }, [loading]);

  const votePollIDs = () => {
    let ids = [];
    for (let i = 0; i < votes.length; i++) {
      ids.push(votes[i].poll_id);
    }
    return ids;
  };

  // console.log(polls);

  const renderItem = ({ item }) => (
    <View>
      <Poll
        title={item.title}
        description={item.description}
        firstname={item.firstname}
        lastname={item.lastname}
        votes={item.totalVotes}
        id={item._id}
        choices={item.choices}
        voted={votePollIDs().includes(item._id) ? true : false}
        date={item.date_created}
        img={item.img}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/** <Header />*/}
      <Category />
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
});
