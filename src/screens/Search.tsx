import React, { useState, useContext, useEffect } from "react";
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
} from "react-native";
import { BASE_URL } from "../utils/baseurl";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GlobalContext } from "../context/GlobalState";
import { globalStyles } from "../components/globalStyles/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SearchResult } from "../components/searchResult/SearchResult";
export const Search = ({ navigation }) => {
  const { data, getCurrentUser, authChecker } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [msg, setMsg] = useState("");
  const handleSearch = () => {
    setLoading(true);
    setMsg("");
    if (search === "") {
      setLoading(false);
      setMsg("");
      return;
    }
    fetch(BASE_URL.search + `/${search}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${data.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
        console.log(data);
        if (data.length === 0) setMsg("No results found.");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setMsg("");
      });
  };

  const renderItem = ({ item }) => (
    <SearchResult
      title={item.title}
      firstname={item.firstname}
      lastname={item.lastname}
      date={item.date_created}
      id={item._id}
      img={item.img}
      description={item.description}
      //date={item.date_created}
    />
  );

  useEffect(() => {
    const logout = navigation.addListener("focus", () => {
      authChecker();
    });
    return logout;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ height: 90, paddingLeft: 20, paddingRight: 20 }]}>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "auto",
            },
          ]}
        >
          <TouchableOpacity
            style={[{ flex: 1 }]}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={25} color="#777" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search polls"
            style={[{ flex: 11, position: "relative" }, styles.formInput]}
            onChangeText={(e) => setSearch(e)}
          />
          <TouchableOpacity
            style={[{ position: "absolute", right: 15, top: 9 }]}
            onPress={handleSearch}
          >
            <Icon name="search" size={20} color="#777" />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? null : results.length > 0 ? (
        <FlatList
          style={[styles.resultWrapper]}
          data={results}
          renderItem={renderItem}
          keyExtractor={(result) => result._id}
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
          {msg}
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formInput: {
    height: 40,
    borderRadius: 10,
    paddingLeft: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#777",
  },
  resultWrapper: {
    marginTop: 0,
  },
});
