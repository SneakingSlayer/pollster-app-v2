import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import { ChoiceProps, PollProps } from '../../types/globalTypes';
import { formatDate } from '../../utils/dateformat';
import { Avatar } from '../avatar/Avatar';
import { ProgressBar } from 'react-native-paper';
import { globalStyles } from '../globalStyles/GlobalStyles';
import { totalVotes } from '../../utils/totalVotes';
import { useNavigation } from '@react-navigation/native';
import { PollNavigationProp } from '../../routes/Routes';

import { useLazyGetTopPollQuery } from '../../redux/services/pollServices';
export const Trending = () => {
  const { navigate } = useNavigation<PollNavigationProp>();
  const [getTopPoll, { data, isFetching, error }] = useLazyGetTopPollQuery();

  React.useEffect(() => {
    getTopPoll({});
  }, []);

  const renderItem = ({ item }: { item: PollProps }) => (
    <TouchableOpacity
      style={styles.GridViewBlockStyle}
      onPress={() => navigate('Poll', { _id: item._id })}
    >
      <View>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Avatar name={item.firstname} size="small" />
          <View>
            <Text style={{ fontWeight: '700', fontSize: 12 }}>
              {item.firstname + ' ' + item.lastname}
            </Text>
            <Text style={{ fontSize: 10 }}>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
        <Text style={{ fontWeight: '700', marginBottom: 5, marginTop: 5 }}>
          {item.title}
        </Text>
        <View style={{ gap: 5 }}>
          {item?.choices?.slice(0, 2)?.map((ic, index) => (
            <View key={index} style={{ flexDirection: 'column', gap: 5 }}>
              <Text style={{ fontSize: 10, fontWeight: '700' }}>
                {ic.choice}
              </Text>
              <ProgressBar
                progress={
                  parseInt(ic.votes as string) / totalVotes(item?.choices)
                }
                color={'#008CFF'}
                style={{ height: 10, borderRadius: 7 }}
              />
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: '700',
          ...globalStyles.fontTitle,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        Top Polls
      </Text>
      <FlatList data={data} renderItem={renderItem} numColumns={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
  },
  GridViewBlockStyle: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  GridViewInsideTextItemStyle: {
    color: '#fff',
    padding: 10,
    fontSize: 18,
    justifyContent: 'center',
  },
});
