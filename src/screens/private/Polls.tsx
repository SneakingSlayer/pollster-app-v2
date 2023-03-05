import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';

import { AdminPoll } from '../../components/adminPoll/AdminPoll';

import { HomeTabScreenProps } from '../../routes/types';
import { PollProps } from '../../types/globalTypes';

import { useLazyGetPollsQuery } from '../../redux/services/pollServices';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loadPolls } from '../../redux/slices/pollSlice';

export const Polls = ({ navigation }: HomeTabScreenProps<'Poll'>) => {
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

  const renderItem = ({ item }: { item: PollProps }) => (
    <View>
      <AdminPoll props={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.pollsWrapper}
        data={polls}
        renderItem={renderItem}
        keyExtractor={(_: any, index: number) => `key${index}`}
        onEndReached={() =>
          setPage((prev) => (prev >= totalPages ? prev : prev + 1))
        }
      />
      {isFetching && <Text>Loading...</Text>}
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
});
