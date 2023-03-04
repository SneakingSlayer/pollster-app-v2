import React, { useState, useContext, useEffect } from "react";
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
} from "react-native";
import { Poll } from "../../components/poll/Poll";
import { Header } from "../../components/header/Header";
import { Category } from "../../components/category/Category";
import { globalStyles } from "../../components/globalStyles/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Modal, Portal, Provider } from "react-native-paper";
import { GlobalContext } from "../../context/GlobalState";
import { BASE_URL } from "../../utils/baseurl";
import * as ImagePicker from "expo-image-picker";
import { ActivityIndicator } from "react-native-paper";
export const NewPoll = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [choices, setChoices] = useState([]);
  const [choice, setChoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data, getCurrentUser, fetchStart, fetchFinish, authChecker } =
    useContext(GlobalContext);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
    borderWidth: 0,
  };

  const handleAddChoice = () => {
    if (choice === "") return;
    const newArr = {
      idx: choices.length + 1,
      choice: choice,
      votes: 0,
    };
    setChoices([...choices, newArr]);
    setChoice("");
    hideModal();
  };

  const handleDeleteChoice = (key) => {
    const filtered = choices.filter((choice) => choice.idx !== key);
    console.log(filtered);
    setChoices(filtered);
  };

  const handleSubmitPoll = () => {
    fetchStart();
    setLoading(true);

    if (title === "" || description === "" || choices.length === 0) {
      fetchFinish();
      setLoading(false);
      return;
    }

    const base64Image = `data:image/jpg;base64,${image.base64}`;
    console.log(base64Image);
    const body = {
      user_id: data.id,
      title: title,
      description: description,
      img: base64Image,
      votes: 0,
      choices: choices,
    };

    fetch(BASE_URL.polls, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${data.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchFinish();
        setChoices([]);
        setTitle("");
        setDescription("");
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        fetchFinish();
        setChoices([]);
        setTitle("");
        setDescription("");
        console.log(err);
        setLoading(false);
      });
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };
  useEffect(() => {
    const logout = navigation.addListener("focus", () => {
      authChecker();
    });
    return logout;
  }, [navigation]);
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
              onPress={handleAddChoice}
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
            onChangeText={(e) => setTitle(e)}
          />
          <TextInput
            style={styles.formInputMulti}
            placeholder="Description"
            multiline
            numberOfLines={4}
            defaultValue={description}
            onChangeText={(e) => setDescription(e)}
          />
          <View style={[styles.uploadBox]}>
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
          </View>
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
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
                    { flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <Icon name="plus" size={12} style={{ marginRight: 5 }} />
                  Add
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 5, marginBottom: 5 }}>
              {choices.length > 0 ? (
                choices.map((choice, idx) => (
                  <View style={styles.choice} key={idx}>
                    <Text>{choice.choice}</Text>
                    <TouchableOpacity
                      onPress={() => handleDeleteChoice(choice.idx)}
                    >
                      <Icon name="trash-alt" size={15} color="#eb3446" />
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text
                  style={[
                    globalStyles.fontMuted,
                    globalStyles.textCenter,
                    globalStyles.fontItalic,
                  ]}
                >
                  No choices added yet.
                </Text>
              )}
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
            <TouchableOpacity
              style={styles.formButton}
              onPress={handleSubmitPoll}
            >
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
    height: "100%",
    backgroundColor: "#fff",
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
    borderColor: "#ddd",
  },
  choice: {
    height: 50,
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formInputMulti: {
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  form: {
    padding: 20,
  },
  formButton: {
    marginTop: 5,
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#008CFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
    overflow: "hidden",
  },
  textButton: {
    color: "#008CFF",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  uploadBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    borderStyle: "dashed",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
  },
});
