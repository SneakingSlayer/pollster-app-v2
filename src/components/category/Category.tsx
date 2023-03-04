import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { globalStyles } from "../globalStyles/GlobalStyles";
export const Category = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <TouchableOpacity style={styles.listItem}>
          <Text style={[globalStyles.active, globalStyles.fontBold]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Text style={[globalStyles.fontMuted, globalStyles.fontBold]}>
            Latest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Text style={[globalStyles.fontMuted, globalStyles.fontBold]}>
            Trending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Text style={[globalStyles.fontMuted, globalStyles.fontBold]}>
            Hot
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
  },
  list: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },
  listItem: {
    marginRight: 10,
  },
});
