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
  Switch,
} from 'react-native';
import { Poll } from '../../components/poll/Poll';
import { Header } from '../../components/header/Header';
import { Category } from '../../components/category/Category';
import { globalStyles } from '../../components/globalStyles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { GlobalContext } from '../../context/GlobalState';
import { BASE_URL } from '../../utils/baseurl';
import { AdminPoll } from '../../components/adminPoll/AdminPoll';
import { formatDate } from '../../utils/dateformat';
import { AdminUsers } from '../../components/adminUsers/AdminUsers';
import { render } from 'react-dom';
import { Modal, Portal, Provider } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

export const Users = ({ navigation }) => {
  const [confirm, setConfirm] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);

  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const hideModal = () => setModalOpen(false);

  const [currentUserID, setCurrentUserID] = useState('');
  const [currentUserPermissions, setCurrentUserPermissions] = useState([]);

  const [permissionValue, setPermissionValue] = useState('');

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    borderWidth: 0,
  };

  const handleAddPermissions = () => {
    setApiLoading(true);
    if (currentUserID === '' || permissionValue === '') {
      setApiLoading(false);
      return;
    }
    const body = {
      user_id: currentUserID,
      permission: permissionValue,
    };

    fetch(BASE_URL.assign, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setApiLoading(false);
        console.log(data);
        setModalOpen(false);
      })
      .catch((err) => {
        setApiLoading(false);
        setModalOpen(false);
        console.log(err);
      });
  };

  const handleRemovePermissions = () => {
    setApiLoading(true);
    if (currentUserID === '' || permissionValue === '') {
      setApiLoading(false);
      return;
    }
    const body = {
      user_id: currentUserID,
      permission: permissionValue,
    };

    fetch(BASE_URL.unassign, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setApiLoading(false);
        setModalOpen(false);
        console.log(data);
      })
      .catch((err) => {
        setApiLoading(false);
        setModalOpen(false);
        console.log(err);
      });
  };

  useEffect(() => {
    const logout = navigation.addListener('focus', () => {
      authChecker();
    });
    return logout;
  }, [navigation]);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Portal>
          <Modal
            visible={modalOpen}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text style={[globalStyles.fontBold, globalStyles.fontTitle]}>
              Assign Roles
            </Text>
            <Text>
              User permissions{' '}
              {currentUserPermissions.map((permission) => permission + ' ')}
            </Text>
            <Picker
              onValueChange={(e) => setPermissionValue(e)}
              selectedValue={permissionValue}
              style={[{ marginTop: 10, marginBottom: 10 }]}
            >
              <Picker.Item color="ddd" label="Select down below" value="" />
              {permissions.length > 0
                ? permissions.map((permission, idx) => (
                    <Picker.Item
                      key={idx}
                      label={permission.name}
                      value={permission.permission}
                    />
                  ))
                : null}
            </Picker>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  {
                    marginBottom: 10,
                    padding: 15,
                    backgroundColor: 'transparent',
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: '#008CFF',
                    overflow: 'hidden',
                    width: '49%',
                  },
                ]}
                onPress={handleRemovePermissions}
              >
                <Text
                  style={[
                    {
                      color: '#008CFF',
                      textAlign: 'center',
                    },
                  ]}
                >
                  Unassign
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.formButton}
                onPress={handleAddPermissions}
              >
                <Text style={styles.buttonText}>Assign</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
        {users.length > 0 ? (
          <FlatList
            style={styles.usersWrapper}
            data={users}
            renderItem={({ item }) => (
              <AdminUsers
                id={item._id}
                firstname={item.firstname}
                lastname={item.lastname}
                username={item.username}
                date_created={item.date_created}
                permissions={item.permissions}
                openModal={() => {
                  setModalOpen(true);
                  setCurrentUserID(item._id);
                  setCurrentUserPermissions(item.permissions);
                }}
              />
            )}
            keyExtractor={(user) => user._id}
          />
        ) : null}
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  formButton: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#008CFF',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#008CFF',
    overflow: 'hidden',
    width: '49%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
