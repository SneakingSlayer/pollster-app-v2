import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { globalStyles } from '../../components/globalStyles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { RadioButton, ProgressBar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDate } from '../../utils/dateformat';
export const Poll = ({ route }) => {
  const [poll, setPoll] = useState([]);
  const [votes, setVotes] = useState([]);
  const props = route.params;
  const [checked, setChecked] = useState('');
  const [choiceDescription, setChoiceDescription] = useState('');
  const [pollTitle, setPollTitle] = useState('');
  const [posterName, setPosterName] = useState('');

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  /* const fetchPoll = () => {
    fetch(BASE_URL.polls + `/${props.pollID}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPoll(data);
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
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPoll();
    getCurrentUser();
    fetchVotes();
  }, [loading]);

  const handleAddVote = () => {
    fetchStart();
    setLoading(true);
    if (checked === '' || data.id === null || props.pollID === '') {
      setLoading(false);
      return;
    }
    const body = {
      user_id: data.id,
      poll_id: props.pollID,
      choice_description: choiceDescription,
      choice: checked,
      poster_name: posterName,
      title: pollTitle,
    };
    console.log(body);

    fetch(BASE_URL.votes, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        fetchFinish();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        fetchFinish();
      });
  };

  const updateVoteCount = () => {
    if (checked === '' || data.id === null || props.pollID === '') return;
    const body = {
      idx: checked,
    };

    fetch(BASE_URL.polls + `/${props.pollID}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${data.token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {});
  };

  const votePollIDs = () => {
    let ids = [];
    for (let i = 0; i < votes.length; i++) {
      ids.push(votes[i].poll_id);
    }
    return ids;
  };

  useEffect(() => {
    const logout = navigation.addListener('focus', () => {
      authChecker();
    });
    return logout;
  }, [navigation]);
*/
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upper}>
        <View style={styles.overlay}></View>
        <View style={styles.pollNavigation}>
          <TouchableOpacity onPress={goBack}>
            <Icon name="chevron-left" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.upperContent}>
          <Text
            style={[
              styles.fontLight,
              globalStyles.fontTitle,
              globalStyles.fontBold,
            ]}
          >
            {props.title}
          </Text>

          <View style={{ width: '100%', flexGrow: 1, flex: 1 }}>
            <Text style={[styles.fontLight]}> {props.description}</Text>
          </View>
        </View>
        <View style={styles.userWrapper}>
          <View style={styles.user}>
            {/**<Image
              style={styles.profilePicture}
              source={require('../../src/assets/images/user.jpg')}
            /> */}
            <View>
              <Text
                style={[
                  globalStyles.fontSm,
                  globalStyles.fontBold,
                  styles.fontLight,
                ]}
              >
                {props.firstname + ' ' + props.lastname}
              </Text>
              <Text
                style={[
                  globalStyles.fontXs,
                  globalStyles.fontMuted,
                  styles.fontLight,
                ]}
              >
                Malayan Colleges
              </Text>
            </View>
          </View>
          <Text
            style={[
              globalStyles.fontXs,
              globalStyles.fontMuted,
              styles.fontLight,
            ]}
          >
            {formatDate(props.date)}
          </Text>
        </View>
        {poll.length > 0 ? (
          <ImageBackground
            source={{ uri: poll[0].img }}
            style={styles.backgroundImage}
          />
        ) : null}
      </View>
      <View style={styles.lower}>
        <View style={[styles.lowerContentHeader]}>
          <Text
            style={[
              globalStyles.primaryTxt,
              globalStyles.fontTitle,
              globalStyles.fontBold,
            ]}
          >
            Poll Results
          </Text>

          <View
            style={
              votePollIDs().includes(props.pollID)
                ? styles.pill
                : styles.disabledPill
            }
          >
            {votePollIDs().includes(props.pollID) ? (
              <Text
                style={[
                  globalStyles.primaryTxt,
                  globalStyles.fontBold,
                  globalStyles.fontSm,
                ]}
              >
                <Icon name="check" size={12} color="#008CFF" /> Voted
              </Text>
            ) : (
              <Text
                style={[
                  globalStyles.fontMuted,
                  globalStyles.fontBold,
                  globalStyles.fontSm,
                ]}
              >
                <Icon name="times" size={12} color="#777" /> Not voted
              </Text>
            )}
          </View>
        </View>

        <ScrollView style={{ maxHeight: '70%' }}>
          {poll.length > 0
            ? poll[0].choices.map((choice, idx) => (
                <View style={{ marginBottom: 10 }} key={idx}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 5,
                    }}
                  >
                    <RadioButton
                      value="first"
                      status={checked === choice.idx ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(choice.idx);
                        setChoiceDescription(choice.choice);
                        setPollTitle(poll[0].title);
                        setPosterName(
                          poll[0].firstname + ' ' + poll[0].lastname
                        );
                      }}
                      color="#008CFF"
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flex: 1,
                      }}
                    >
                      <Text
                        style={[
                          checked === choice.idx
                            ? globalStyles.primaryTxt
                            : globalStyles.fontMuted,
                          globalStyles.fontBold,
                        ]}
                      >
                        {choice.choice}
                      </Text>
                      <Text
                        style={[
                          checked === choice.idx
                            ? globalStyles.primaryTxt
                            : globalStyles.fontMuted,
                          globalStyles.fontBold,
                        ]}
                      >
                        {choice.votes}
                      </Text>
                    </View>
                  </View>

                  <ProgressBar
                    progress={
                      choice.votes === 0 || poll[0].totalVotes === 0
                        ? 0
                        : choice.votes / poll[0].totalVotes
                    }
                    color={checked === choice.idx ? '#008CFF' : '#ddd'}
                    style={{ height: 20, borderRadius: 7 }}
                  />
                </View>
              ))
            : null}
        </ScrollView>

        {votePollIDs().includes(props.pollID) ? (
          <TouchableOpacity
            style={styles.disabledButton}
            onPress={() => {
              handleAddVote();
              updateVoteCount();
            }}
            disabled={true}
          >
            <Text
              style={[
                styles.buttonText,

                globalStyles.fontBold,
                { textAlign: 'center', color: '#fff' },
              ]}
            >
              Vote
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={loading ? styles.disabledButton : styles.formButton}
            onPress={() => {
              handleAddVote();
              updateVoteCount();
            }}
            disabled={loading ? true : false}
          >
            <Text
              style={[
                styles.buttonText,

                globalStyles.fontBold,
                { textAlign: 'center', color: '#fff' },
              ]}
            >
              Vote
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  upper: {
    width: '100%',
    height: '100%',
    top: 0,
  },
  lower: {
    width: '100%',
    backgroundColor: '#fff',
    height: '50%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    zIndex: 99,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  upperContent: {
    position: 'absolute',
    zIndex: 1,
    bottom: '60%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  fontLight: {
    color: '#fff',
  },
  profilePicture: {
    marginRight: 5,
    borderRadius: 100,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  userWrapper: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    bottom: '55%',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pollNavigation: {
    paddingLeft: 20,
    position: 'absolute',
    top: '5%',
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    opacity: 0.6,
    zIndex: 1,
  },
  pill: {
    backgroundColor: '#EBF5FF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 100,
  },
  lowerContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    height: 30,
    borderRadius: 10,
    marginBottom: 10,
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
  disabledButton: {
    marginTop: 5,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#008CFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
    opacity: 0.3,
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
