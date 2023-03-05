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
import { Poll } from '../poll/Poll';

import { globalStyles } from '../globalStyles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { BASE_URL } from '../../utils/baseurl';
import { AdminPoll } from '../adminPoll/AdminPoll';
import { formatDate } from '../../utils/dateformat';
import { Modal, Portal, Provider } from 'react-native-paper';
export const AdminUsers = (props) => {
  const { openModal } = props;

  /*const { fetchStart, fetchFinish, data, getCurrentUser } =
    useContext(GlobalContext);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    getCurrentUser();
  }, []);
  const handleDelete = () => {
    fetchStart();
    fetch(BASE_URL.delete + `/${props.id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        fetchFinish();
      })
      .catch((err) => {
        fetchFinish();
      });
  };*/

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingTop: 15,
          paddingBottom: 15,
          borderBottomWidth: 0.5,
          borderBottomColor: '#ddd',
          paddingLeft: 20,
          paddingRight: 20,
        },
      ]}
    >
      <View>
        <Text style={[globalStyles.fontSm, globalStyles.primaryTxt]}>
          @{props.username}
        </Text>
        <Text style={[globalStyles.fontBold]}>
          {props.firstname + ' ' + props.lastname}
        </Text>
        <Text style={[globalStyles.fontXs, globalStyles.fontMuted]}>
          {formatDate(props.date_created)}
        </Text>
      </View>
      {!confirm ? (
        <View style={[{ marginTop: 'auto', flexDirection: 'row' }]}>
          <TouchableOpacity
            onPress={() => setConfirm(true)}
            style={[{ marginRight: 10 }]}
          >
            <Text
              style={[globalStyles.primaryTxt, globalStyles.fontBold]}
              onPress={openModal}
            >
              <Icon name="hard-hat" size={15} color="#008CFF" /> Role
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{ marginTop: 'auto' }]}
            onPress={() => setConfirm(true)}
          >
            <Text style={[{ color: '#fa2d37' }, globalStyles.fontBold]}>
              <Icon name="times" size={15} color="#fa2d37" /> Delete
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[{ marginTop: 'auto', flexDirection: 'row' }]}>
          <TouchableOpacity
            style={[{ marginRight: 10 }]}
            onPress={() => {
              handleDelete();
              setConfirm(false);
            }}
          >
            <Text style={[globalStyles.primaryTxt, globalStyles.fontBold]}>
              <Icon name="check" size={15} color="#008CFF" /> Delete this user?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setConfirm(false)}>
            <Text style={[globalStyles.fontMuted, globalStyles.fontBold]}>
              <Icon name="times" size={15} color="#777" /> Cancel
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  usersWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
