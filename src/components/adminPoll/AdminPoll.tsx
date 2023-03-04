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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Modal, Portal, Provider } from 'react-native-paper';
import { globalStyles } from '../globalStyles/GlobalStyles';
import { BASE_URL } from '../../utils/baseurl';
import { GlobalContext } from '../../context/GlobalState';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../utils/dateformat';
export const AdminPoll = (props) => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(false);
  const { data, getCurrentUser, loading, fetchStart, fetchFinish } =
    useContext(GlobalContext);
  const handleDelete = () => {
    fetchStart();
    fetch(BASE_URL.polls + `/${props.id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchFinish();
      })
      .catch((err) => {
        fetchFinish();
        console.log(err);
      });
  };
  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.userWrapper}>
          <View style={styles.user}>
            <Image
              style={styles.profilePicture}
              source={require('../../assets/images/user.jpg')}
            />
            <View>
              <Text style={[styles.fontSm, styles.fontBold]}>
                {props.firstname + ' ' + props.lastname}
              </Text>
              <Text style={[styles.fontXs, styles.fontMuted]}>
                Malayan Colleges
              </Text>
            </View>
          </View>
          <Text style={[styles.fontXs, styles.fontMuted]}>
            {formatDate(props.date)}
          </Text>
        </View>
        <View>
          <Text style={styles.pollTitle}>{props.title}</Text>
          <Text style={[styles.fontReg, styles.fontMuted]}>
            {props.description}
          </Text>
        </View>
        <View style={styles.imgWrapper}>
          {props.img !== null ? (
            <Image style={styles.pollImg} source={{ uri: props.img }} />
          ) : null}
        </View>
        <View style={styles.ctaWrapper}>
          <View style={styles.leftButtons}>
            {confirm ? (
              <>
                <TouchableOpacity
                  style={styles.viewPollBtn}
                  onPress={handleDelete}
                >
                  <Text style={[globalStyles.primaryTxt, styles.fontBold]}>
                    <Icon name="check" size={15} color="#008CFF" /> Delete this
                    poll?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.viewPollBtn}
                  onPress={() => setConfirm(false)}
                >
                  <Text style={[globalStyles.fontMuted, styles.fontBold]}>
                    <Icon name="times" size={15} color="#777" /> Cancel
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.viewPollBtn}
                  onPress={() => setConfirm(true)}
                >
                  <Text style={[{ color: '#fa2d37' }, styles.fontBold]}>
                    <Icon name="times" size={15} color="#fa2d37" /> Delete Poll
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.viewPollBtn}
                  onPress={() => {
                    navigation.navigate('poll', {
                      pollID: props.id,
                      title: props.title,
                      description: props.description,
                      firstname: props.firstname,
                      lastname: props.lastname,
                      date: props.date,
                    });
                  }}
                >
                  <Text style={[styles.primaryTxt, styles.fontBold]}>
                    <Icon name="heart" size={15} color="#008CFF" /> View Poll
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 20,
    borderColor: '#ddd',
  },
  userWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  pollTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  fontReg: {
    fontSize: 14,
  },
  fontSm: {
    fontSize: 12,
  },
  fontXs: {
    fontSize: 10,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  fontMuted: {
    color: '#777',
  },
  profilePicture: {
    marginRight: 5,
    borderRadius: 100,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  leftButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryTxt: {
    color: '#008CFF',
  },
  viewPollBtn: {
    marginLeft: 10,
  },
  pill: {
    backgroundColor: '#EBF5FF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 100,
  },
  ctaWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  pollImg: {
    width: '100%',
    height: 240,
    borderRadius: 25,
  },
  imgWrapper: {
    marginTop: 15,
  },
  disabledPill: {
    backgroundColor: '#ebebeb',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 100,
  },
});
