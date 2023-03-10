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

import { useRemoveUserMutation } from '../../redux/services/userServices';
import { UserProps } from '../../types/globalTypes';

interface AdminUserProps {
  admin: UserProps;
  openModal: () => void;
}

export const AdminUsers = ({ admin, openModal }: AdminUserProps) => {
  const [confirm, setConfirm] = useState(false);
  const [removeUser, { data, error }] = useRemoveUserMutation();
  const handleDelete = () => removeUser({ id: admin._id });

  return (
    <View style={styles.container}>
      <View>
        <Text style={[globalStyles.fontSm, globalStyles.primaryTxt]}>
          @{admin.username}
        </Text>
        <Text style={[globalStyles.fontBold]}>
          {admin.firstname + ' ' + admin.lastname}
        </Text>
        <Text style={[globalStyles.fontXs, globalStyles.fontMuted]}>
          {formatDate(admin.createdAt)}
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
              <Icon name="times" size={15} color="#fa2d37" /> Remove
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[{ marginTop: 'auto', flexDirection: 'row' }]}>
          <TouchableOpacity
            style={[{ marginRight: 10 }]}
            onPress={handleDelete}
          >
            <Text style={[globalStyles.primaryTxt, globalStyles.fontBold]}>
              <Icon name="check" size={15} color="#008CFF" /> Remove user?
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
  usersWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
