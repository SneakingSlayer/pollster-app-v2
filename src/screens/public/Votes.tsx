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
  FlatList,
  RefreshControl,
} from 'react-native';
import { globalStyles } from '../../components/globalStyles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { RadioButton, ProgressBar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDate } from '../../utils/dateformat';

import { useLazyGetVotesByUserQuery } from '../../redux/services/voteServices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const Votes = ({ navigation }) => {
  const [votes, setVotes] = useState([]);

  const user = useAppSelector((state) => state.auth);

  const [getVotesByUser, { data, isFetching }] = useLazyGetVotesByUserQuery();

  const loadVotes = async (id: string, page = 1) => {
    try {
      const result = await getVotesByUser({ id, page });
      setVotes((prev) => [...prev, ...result?.data?.votes]);
    } catch (error) {
      setVotes([]);
    }
  };

  React.useEffect(() => {
    if (user.id) {
      console.log('this renders');
      loadVotes(user.id);
    }
  }, [user]);

  console.log(data);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: '#ddd',
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.box]}>
                <Text style={[globalStyles.fontBold, globalStyles.fontLight]}>
                  {item.poster_name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={[globalStyles.fontReg]}>
                  You voted for {item.choice_description} in {item.title}
                </Text>
                <Text style={[globalStyles.fontXs]}>
                  {item.poster_name} {formatDate(item.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {data?.currentPage < data?.totalPages && index === votes?.length - 1 ? (
          <TouchableOpacity
            onPress={() => loadVotes(user?.id, data?.currentPage + 1)}
          >
            <Text
              style={{
                ...globalStyles.primaryTxt,
                ...globalStyles.fontBold,
                textAlign: 'center',
                padding: 12,
              }}
            >
              See more
            </Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        //style={[styles.resultWrapper]}
        data={votes}
        renderItem={renderItem}
        keyExtractor={(result: any, index: number) => `key${index}`}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              setVotes([]);
              loadVotes(user?.id, 1);
            }}
          />
        }
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    backgroundColor: '#777',
    height: 35,
    width: 35,
    borderRadius: 100,
    marginRight: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
