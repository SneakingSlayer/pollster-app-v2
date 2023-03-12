import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { globalStyles } from '../../components/globalStyles/GlobalStyles';
import { AdminUsers } from '../../components/adminUsers/AdminUsers';
import { Modal, Portal, Provider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import {
  useLazyGetUsersQuery,
  useAddPermissionMutation,
  useRemovePermissionMutation,
} from '../../redux/services/userServices';
import { PERMISSIONS } from '../../constants/constants';
import { UserProps } from '../../types/globalTypes';

const containerStyle = {
  backgroundColor: 'white',
  padding: 20,
  marginLeft: 10,
  marginRight: 10,
  borderRadius: 15,
  borderWidth: 0,
};

export const Users = () => {
  const [users, setUsers] = React.useState<UserProps[]>([]);
  const [page, setPage] = React.useState(1);
  const [modalOpen, setModalOpen] = React.useState(false);
  const hideModal = () => setModalOpen(false);

  const [currentUserID, setCurrentUserID] = React.useState('');
  const [currentUserPermissions, setCurrentUserPermissions] = React.useState<
    string[]
  >([]);

  const [permissionValue, setPermissionValue] = React.useState('');

  const [getUsers, { data, isFetching }] = useLazyGetUsersQuery();
  const [
    addPermissions,
    { data: addResult, error: addError, isLoading: isAdding },
  ] = useAddPermissionMutation();
  const [
    removePermissions,
    { data: removeResult, error: removeError, isLoading: isRemoving },
  ] = useRemovePermissionMutation();

  const loadUsers = async (page: number) => {
    try {
      const results = await getUsers({ page: page });
      setUsers((prev) => [...prev, ...results?.data?.users]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    loadUsers(page);
  }, [page]);

  const renderItem = ({ item }: { item: UserProps }) => {
    return (
      <AdminUsers
        admin={item}
        openModal={() => {
          setModalOpen(true);
          setCurrentUserID(item._id);
          setCurrentUserPermissions(item.permissions);
        }}
      />
    );
  };

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
              {PERMISSIONS.map((permission, idx) => (
                <Picker.Item
                  key={idx}
                  label={permission.name}
                  value={permission.permission}
                />
              ))}
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
                style={{
                  ...styles.formButtonOutline,
                  opacity: isAdding || isRemoving ? 0.5 : 1,
                }}
                onPress={async () => {
                  await removePermissions({
                    id: currentUserID,
                    permission: permissionValue,
                  });
                  setModalOpen(false);
                }}
                disabled={isAdding || isRemoving}
              >
                <Text
                  style={{
                    color: '#008CFF',
                    textAlign: 'center',
                  }}
                >
                  {isRemoving ? (
                    <ActivityIndicator size="small" color={'#008CFF'} />
                  ) : (
                    'Unassign'
                  )}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.formButton,
                  opacity: isAdding || isRemoving ? 0.5 : 1,
                }}
                onPress={async () => {
                  await addPermissions({
                    id: currentUserID,
                    permission: permissionValue,
                  });
                  setModalOpen(false);
                }}
                disabled={isAdding || isRemoving}
              >
                <Text style={styles.buttonText}>
                  {isAdding ? (
                    <ActivityIndicator size="small" color={'#fff'} />
                  ) : (
                    'Assign'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>

        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(_, index) => `${index}key`}
          onEndReached={() =>
            setPage((prev) => (prev >= data?.totalPages ? prev : prev + 1))
          }
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {
                setUsers([]);
                setPage(1);
                loadUsers(1);
              }}
            />
          }
        />
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
  formButtonOutline: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: 'transparent',
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
