import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../components/globalStyles/GlobalStyles';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchResult } from '../../components/searchResult/SearchResult';

import { useLazySearchPollQuery } from '../../redux/services/searchServices';
import { PollProps } from '../../types/globalTypes';
import { ActivityIndicator } from 'react-native-paper';

import { HomeTabScreenProps } from '../../routes/types';

export const Search = ({ navigation }: HomeTabScreenProps<'Search'>) => {
  // TODO: Implement debouncing & types

  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any>([]);
  const [isDoneSearching, setIsDoneSearching] = useState(false);

  const [searchPoll, { data, error, isFetching }] = useLazySearchPollQuery();

  const renderItem = ({ item, index }: { item: PollProps; index: number }) => {
    const isAdding = index === data?.query?.length - 1 && isFetching;
    return (
      <>
        <SearchResult props={item} />
        {isAdding ? (
          <View style={{ paddingVertical: 12 }}>
            <ActivityIndicator size={'small'} color="#008CFF" />
          </View>
        ) : null}
      </>
    );
  };

  const onSearch = async () => {
    setResults([]);
    await searchPoll({ query: search, page: 1 });
    setIsDoneSearching(true);
  };

  React.useEffect(() => {
    if (data?.query) {
      setResults((prev: any) => [...prev, ...data?.query]);
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ height: 90, paddingLeft: 20, paddingRight: 20 }]}>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'auto',
            },
          ]}
        >
          <TextInput
            placeholder="Search polls"
            style={[{ flex: 11, position: 'relative' }, styles.formInput]}
            onChangeText={(e) => setSearch(e)}
          />
          <TouchableOpacity
            style={[{ position: 'absolute', right: 15, top: 9 }]}
            onPress={onSearch}
          >
            <Icon name="search" size={20} color="#777" />
          </TouchableOpacity>
        </View>
      </View>
      {!data?.query?.length && isDoneSearching && !isFetching ? (
        <Text
          style={{
            ...globalStyles.textCenter,
            padding: 20,
          }}
        >
          No results found.
        </Text>
      ) : null}
      {!results?.length && isFetching ? (
        <View style={{ paddingVertical: 12 }}>
          <ActivityIndicator size={'small'} color="#008CFF" />
        </View>
      ) : null}

      <FlatList
        style={[styles.resultWrapper]}
        data={results}
        renderItem={renderItem}
        keyExtractor={(result: any, index: number) => `key${index}`}
      />

      {data?.currentPage < data?.totalPages && (
        <TouchableOpacity
          onPress={() => {
            searchPoll({ query: search, page: data?.currentPage + 1 });
          }}
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formInput: {
    height: 40,
    borderRadius: 10,
    paddingLeft: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#777',
  },
  resultWrapper: {
    marginTop: 0,
  },
});
