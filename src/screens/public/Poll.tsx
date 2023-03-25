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
import {
  pollApi,
  useLazyGetPollQuery,
} from '../../redux/services/pollServices';
import {
  useLazyGetVotesQuery,
  useAddVoteMutation,
} from '../../redux/services/voteServices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updatePoll } from '../../redux/slices/pollSlice';
import { Navigation, PollProps } from '../../types/globalTypes';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/Routes';
import { Pill } from '../../components/pill/Pill';
import { ActivityIndicator } from 'react-native';

type PollProp = {
  route: RouteProp<RootStackParamList, 'Poll'>;
};

export const Poll = ({ route }: PollProp) => {
  const { _id } = route.params;

  const [selected, setSelected] = useState({
    user_id: '',
    poll_id: '',
    choice_description: '',
    choice: null,
    poster_name: '',
    title: '',
  });

  const { goBack } = useNavigation<Navigation>();
  const handleBack = () => goBack();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);

  const [getPollQuery, { data: poll, isFetching: isFetchingPoll }] =
    useLazyGetPollQuery();

  const [getVotes, { data: votes, isFetching: isFetchingVotes }] =
    useLazyGetVotesQuery();

  const [addVote, { data: voteResult, isLoading: isAddingVote, error }] =
    useAddVoteMutation();

  useEffect(() => {
    getPollQuery({ id: _id });
    getVotes({ id: _id });
  }, [_id]);

  const onSubmit = async () => {
    try {
      const result = await addVote({ payload: selected });
      dispatch(pollApi.util.invalidateTags(['GET_POLL']));
      dispatch(updatePoll((result as { data: PollProps })?.data));
    } catch (error) {
      dispatch(pollApi.util.invalidateTags(['GET_POLL']));
    }
  };

  const hasVoted = votes?.map((vote: any) => vote.user_id)?.includes(user?.id);

  const isSelectedOption = (index: number): boolean => {
    if (parseInt(selected.choice ?? '-1') === index) return true;
    return false;
  };

  React.useEffect(() => {
    if (hasVoted) {
      const vote = votes?.find((vote: any) => vote.user_id === user?.id);
      setSelected({
        user_id: user?.id ?? '',
        poll_id: poll?._id,
        choice_description: vote?.choice_description,
        choice: vote?.choice,
        poster_name: vote?.poster_name,
        title: vote?.title,
      });
    }
  }, [hasVoted]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upper}>
        <View style={styles.overlay}></View>
        <View style={styles.pollNavigation}>
          <TouchableOpacity onPress={handleBack}>
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
            {poll?.title}
          </Text>

          <View style={{ width: '100%', flexGrow: 1, flex: 1 }}>
            <Text style={[styles.fontLight]}> {poll?.description}</Text>
          </View>
        </View>
        <View style={styles.userWrapper}>
          <View style={styles.user}>
            {/**<Image style={styles.profilePicture} source={require('')} /> */}
            <View>
              <Text
                style={[
                  globalStyles.fontSm,
                  globalStyles.fontBold,
                  styles.fontLight,
                ]}
              >
                {poll?.firstname + ' ' + poll?.lastname}
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
            {formatDate(poll?.createdAt)}
          </Text>
        </View>
        {poll?.img && (
          <ImageBackground
            source={{ uri: poll?.img }}
            style={styles.backgroundImage}
          />
        )}
      </View>
      {/** */}
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

          <View style={hasVoted ? styles.pill : styles.disabledPill}>
            {hasVoted ? (
              <Pill
                icon={<Icon name="check" size={12} color="#008CFF" />}
                variant="success"
                label="Voted"
              />
            ) : (
              <Pill
                icon={<Icon name="times" size={12} color="#777" />}
                variant="muted"
                label="Not voted"
              />
            )}
          </View>
        </View>

        <ScrollView style={{ maxHeight: '70%' }}>
          {poll?.choices?.map((choice: any, idx: number) => (
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
                  status={isSelectedOption(idx) ? 'checked' : 'unchecked'}
                  onPress={() =>
                    setSelected((prev: any) => ({
                      ...prev,
                      user_id: user?.id,
                      poll_id: _id,
                      choice_description: choice.choice,
                      poster_name: poll?.firstname + ' ' + poll?.lastname,
                      choice: idx,
                      title: poll?.title,
                    }))
                  }
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
                      isSelectedOption(idx)
                        ? globalStyles.primaryTxt
                        : globalStyles.fontMuted,
                      globalStyles.fontBold,
                    ]}
                  >
                    {choice.choice}
                  </Text>
                  <Text
                    style={[
                      isSelectedOption(idx)
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
                  choice.vote === 0 || poll?.totalVotes === 0
                    ? 0
                    : choice.votes / poll?.totalVotes
                }
                color={isSelectedOption(idx) ? '#008CFF' : '#ddd'}
                style={{ height: 20, borderRadius: 7 }}
              />
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={
            isAddingVote || hasVoted ? styles.disabledButton : styles.formButton
          }
          onPress={onSubmit}
          disabled={isAddingVote ? true : false}
        >
          <Text
            style={[
              globalStyles.fontBold,
              { textAlign: 'center', color: '#fff' },
            ]}
          >
            {isAddingVote ? (
              <ActivityIndicator size="small" color="#ffff" />
            ) : (
              'Vote'
            )}
          </Text>
        </TouchableOpacity>
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
    opacity: 0.4,
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
