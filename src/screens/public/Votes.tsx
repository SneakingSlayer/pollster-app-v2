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
} from 'react-native';
import { globalStyles } from '../../components/globalStyles/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { RadioButton, ProgressBar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDate } from '../../utils/dateformat';
export const Votes = ({ navigation }) => {
  const [votes, setVotes] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);

  const renderItem = ({ item }) => (
    <View
      style={[
        {
          borderBottomWidth: 0.5,
          borderBottomColor: '#ddd',
          padding: 20,
        },
      ]}
    >
      <Text
        style={[
          globalStyles.fontBold,
          globalStyles.primaryTxt,
          globalStyles.fontSm,
        ]}
      >
        Voted for "{item.choice_description}"
      </Text>
      <Text style={[globalStyles.fontBold, globalStyles.fontTitle]}>
        {item.title}
      </Text>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 5,
          },
        ]}
      >
        <View style={[{ flexDirection: 'row', alignItems: 'center' }]}>
          <View style={[styles.box]}>
            <Text style={[globalStyles.fontBold, globalStyles.fontLight]}>
              {item.poster_name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={[globalStyles.fontBold, globalStyles.fontSm]}>
              {item.poster_name}
            </Text>
            <Text style={[globalStyles.fontXs]}>
              {formatDate(item.date_created)}
            </Text>
          </View>
        </View>
        {/**  <TouchableOpacity>
              <Text style={[globalStyles.primaryTxt, globalStyles.fontBold]}>
                <Icon name="heart" size={15} color="#008CFF" /> View Poll
              </Text>
            </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/**votes.map((vote, idx) => (
        <View
          key={idx}
          style={[
            {
              borderBottomWidth: 0.5,
              borderBottomColor: "#ddd",
              padding: 20,
            },
          ]}
        >
          <Text
            style={[
              globalStyles.fontBold,
              globalStyles.primaryTxt,
              globalStyles.fontSm,
            ]}
          >
            Voted for "{vote.choice_description}"
          </Text>
          <Text style={[globalStyles.fontBold, globalStyles.fontTitle]}>
            {vote.title}
          </Text>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 5,
              },
            ]}
          >
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
              <View style={[styles.box]}>
                <Text style={[globalStyles.fontBold, globalStyles.fontLight]}>
                  {vote.poster_name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={[globalStyles.fontBold, globalStyles.fontSm]}>
                  {vote.poster_name}
                </Text>
                <Text style={[globalStyles.fontXs]}>
                  {formatDate(vote.date_created)}
                </Text>
              </View>
            </View>
      
          </View>
        </View>
          ))*/}

      {apiLoading ? null : votes.length > 0 ? (
        <FlatList
          style={[styles.resultWrapper]}
          data={votes}
          renderItem={renderItem}
          keyExtractor={(vote) => vote._id}
        /> /**(
          results.map((result, idx) => (
            <SearchResult
              key={idx}
              title={result.title}
              firstname={result.firstname}
              lastname={result.lastname}
              date={result.date_created}
              id={result._id}
              img={result.img}
              description={result.description}
            />
          )) 
          
        ) */
      ) : (
        <Text
          style={[
            globalStyles.fontBold,
            globalStyles.textCenter,
            { marginTop: 15 },
          ]}
        >
          No votes yet.
        </Text>
      )}
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
    height: 30,
    width: 30,
    borderRadius: 100,
    marginRight: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
