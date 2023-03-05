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
  Image,
} from 'react-native';
import { Poll } from '../../components/poll/Poll';
import { Header } from '../../components/header/Header';
import { Category } from '../../components/category/Category';
import { globalStyles } from '../../components/globalStyles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal, Provider } from 'react-native-paper';

import { BASE_URL } from '../../utils/baseurl';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native-paper';
import { HomeTabScreenProps } from '../../routes/types';
import { useAddPollMutation } from '../../redux/services/pollServices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addPoll as addPolltoState } from '../../redux/slices/pollSlice';

export const NewPoll = ({ navigation }: HomeTabScreenProps<'NewPoll'>) => {
  const [visible, setVisible] = useState(false);
  const [choices, setChoices] = useState([]);
  const [choice, setChoice] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [newPoll, setNewPoll] = useState({
    user_id: '',
    title: '',
    description: '',
    img: '',
    votes: 0,
    choices: [] as any,
  });

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    borderWidth: 0,
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const [addPoll] = useAddPollMutation();

  useEffect(() => {}, []);

  const onSubmit = async () => {
    try {
      const result = await addPoll({
        payload: { ...newPoll, user_id: user?.id },
      });
      console.log(result?.data);
      dispatch(addPolltoState(result?.data));
    } catch (error) {}
  };
  console.log(newPoll.choices);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text
              style={[
                globalStyles.fontBold,
                globalStyles.fontTitle,
                { marginBottom: 15 },
              ]}
            >
              Add a choice
            </Text>
            <TextInput
              style={styles.formInputMulti}
              placeholder="Choice"
              defaultValue={choice}
              onChangeText={(e) => setChoice(e)}
            />
            <TouchableOpacity
              style={styles.formButton}
              onPress={() => {
                setNewPoll((prev: any) => ({
                  ...prev,
                  choices: [
                    ...prev.choices,
                    {
                      choice: choice,
                      votes: 0,
                    },
                  ],
                }));
              }}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
        <ScrollView style={styles.form}>
          <TextInput
            style={styles.formInput}
            placeholder="Title"
            defaultValue={title}
            onChangeText={(e) => setNewPoll((prev) => ({ ...prev, title: e }))}
          />
          <TextInput
            style={styles.formInputMulti}
            placeholder="Description"
            multiline
            numberOfLines={4}
            defaultValue={description}
            onChangeText={(e) =>
              setNewPoll((prev) => ({ ...prev, description: e }))
            }
          />
          {/** <View style={[styles.uploadBox]}>
            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Text
                  style={[
                    globalStyles.fontBold,
                    globalStyles.primaryTxt,
                    globalStyles.fontSubtitle,
                  ]}
                >
                  Tap to change image
                </Text>
              ) : (
                <>
                  <Icon
                    name="image"
                    size={36}
                    style={[
                      globalStyles.textCenter,
                      globalStyles.fontMuted,
                      { marginRight: 5 },
                    ]}
                  />
                  <Text
                    style={[
                      globalStyles.fontBold,
                      globalStyles.fontSubtitle,
                      globalStyles.textCenter,
                      globalStyles.fontMuted,
                    ]}
                  >
                    Upload your image here.
                  </Text>
                  <Text
                    style={[
                      globalStyles.fontMuted,
                      globalStyles.textCenter,
                      globalStyles.fontSm,
                    ]}
                  >
                    50mb file size limit, JPG and PNG only.
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>*/}
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}
            >
              <Text style={[globalStyles.fontBold, globalStyles.fontMuted]}>
                Choices
              </Text>
              <TouchableOpacity onPress={showModal}>
                <Text
                  style={[
                    globalStyles.primaryTxt,
                    globalStyles.fontBold,
                    { flexDirection: 'row', alignItems: 'center' },
                  ]}
                >
                  <Icon name="plus" size={12} style={{ marginRight: 5 }} />
                  Add
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 5, marginBottom: 5 }}>
              {newPoll.choices?.map((choice, idx) => (
                <View style={styles.choice} key={idx}>
                  <Text>{choice.choice}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setNewPoll((prev) => ({
                        ...prev,
                        choices: prev.choices.filter(
                          (choice, index) => index !== idx
                        ),
                      }));
                    }}
                  >
                    <Icon name="trash-alt" size={15} color="#eb3446" />
                  </TouchableOpacity>
                </View>
              ))}
              {!newPoll.choices?.length ? (
                <Text
                  style={[
                    globalStyles.fontMuted,
                    globalStyles.textCenter,
                    globalStyles.fontItalic,
                  ]}
                >
                  No choices added yet.
                </Text>
              ) : null}
            </View>
          </View>

          {loading ? (
            <View>
              <ActivityIndicator
                animating={true}
                size="large"
                color="#008CFF"
              />
              <Text
                style={[
                  globalStyles.fontItalic,
                  globalStyles.fontMuted,
                  globalStyles.textCenter,
                  { marginTop: 10 },
                ]}
              >
                Posting poll...
              </Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.formButton} onPress={onSubmit}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    </Provider>
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
  uploadBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
});
