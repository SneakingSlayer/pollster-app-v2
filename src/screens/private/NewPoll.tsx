import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import { globalStyles } from '../../components/globalStyles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal, Provider } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native-paper';

import { useAddPollMutation } from '../../redux/services/pollServices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addPoll as addPolltoState } from '../../redux/slices/pollSlice';
import { ChoiceProps, PollProps } from '../../types/globalTypes';

interface PollValues {
  user_id: string;
  title: string;
  description: string;
  img: string;
  votes: number;
  choices: ChoiceProps[];
}

const initialPollValues = {
  user_id: '',
  title: '',
  description: '',
  img: '',
  votes: 0,
  choices: [] as ChoiceProps[],
};

const containerStyle = {
  backgroundColor: 'white',
  padding: 20,
  marginLeft: 10,
  marginRight: 10,
  borderRadius: 15,
  borderWidth: 0,
};

export const NewPoll = () => {
  const [visible, setVisible] = useState(false);
  const [choice, setChoice] = useState('');

  const [newPoll, setNewPoll] = useState(initialPollValues);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);
  const [addPoll, { isLoading: loading, error }] = useAddPollMutation();

  const onSubmit = async () => {
    try {
      if (!newPoll.title || !newPoll.description || !newPoll?.choices?.length)
        return;
      const result = await addPoll({
        payload: { ...newPoll, user_id: user?.id },
      });

      setNewPoll(initialPollValues);
      dispatch(addPolltoState((result as { data: PollProps })?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setNewPoll((prev) => ({
        ...prev,
        img: `data:image/jpg;base64,${result.assets[0].base64}`,
      }));
    }
  };

  console.log(loading);

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
                setChoice('');
                setVisible(false);
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
            defaultValue={newPoll.title}
            onChangeText={(e) => setNewPoll((prev) => ({ ...prev, title: e }))}
          />
          <TextInput
            style={styles.formInputMulti}
            placeholder="Description"
            multiline
            numberOfLines={4}
            defaultValue={newPoll.description}
            onChangeText={(e) =>
              setNewPoll((prev) => ({ ...prev, description: e }))
            }
          />
          {/***/}
          <View style={[styles.uploadBox]}>
            {newPoll.img ? (
              <View style={{ width: '100%', position: 'relative' }}>
                <Image
                  style={{ ...styles.pollImg }}
                  source={{ uri: newPoll.img }}
                />
                <TouchableOpacity
                  onPress={() => setNewPoll((prev) => ({ ...prev, img: '' }))}
                  style={{ top: 10, right: 15, position: 'absolute' }}
                >
                  <Icon name="times" size={32} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={handlePickImage}>
                {false ? (
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
            )}
          </View>
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
              {newPoll.choices?.map((choice: ChoiceProps, idx: number) => (
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
          <TouchableOpacity
            style={loading ? styles.disabledButton : styles.formButton}
            onPress={onSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="small" color="#008CFF" />
              ) : (
                'Post'
              )}
            </Text>
          </TouchableOpacity>
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
  imgWrapper: {
    marginTop: 15,
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
  form: { paddingHorizontal: 20 },
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
  disabledButton: {
    marginTop: 5,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#008CFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
    opacity: 0.1,
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
    padding: 35,
    marginBottom: 10,
  },
  pollImg: {
    width: '100%',
    height: 240,
    borderRadius: 25,
  },
});
