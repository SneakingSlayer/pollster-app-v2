import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Poll } from '../../components/poll/Poll';
import { Header } from '../../components/header/Header';
import { Category } from '../../components/category/Category';
import { BASE_URL } from '../../utils/baseurl';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useLazyGetPollsQuery } from '../../redux/services/pollServices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearPoll, loadPolls } from '../../redux/slices/pollSlice';
import { PollProps } from '../../types/globalTypes';

export const Home = () => {
  const [page, setPage] = useState(1);

  const [getPolls, { isFetching, data }] = useLazyGetPollsQuery();
  const totalPages = data?.totalPages;

  const dispatch = useAppDispatch();
  const { polls } = useAppSelector((state) => state.polls);

  const handlePaginatedPoll = async (page: number) => {
    try {
      const result = await getPolls({ page: page });
      dispatch(loadPolls(result?.data?.polls));
    } catch (error) {
      console.log(error);
      dispatch(loadPolls([]));
    }
  };

  useEffect(() => {
    handlePaginatedPoll(page);
  }, [page]);

  console.log(polls);

  const handleRefresh = () => {
    dispatch(clearPoll());
    setPage(1);
    handlePaginatedPoll(1);
  };

  const renderItem = ({ item, index }: { item: PollProps; index: number }) => (
    <View>
      <Poll props={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/**<Category /> */}
      <FlatList
        style={styles.pollsWrapper}
        data={polls}
        renderItem={renderItem}
        keyExtractor={(_: any, index: number) => `key${index}`}
        onEndReached={() =>
          setPage((prev) => (prev >= totalPages ? prev : prev + 1))
        }
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
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
});
