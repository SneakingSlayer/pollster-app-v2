import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { globalStyles } from '../globalStyles/GlobalStyles';
import { formatDate } from '../../utils/dateformat';
import { useNavigation } from '@react-navigation/native';
import { PollProps } from '../../types/globalTypes';
export const SearchResult = ({ props }: { props: PollProps }) => {
  const navigation = useNavigation<any>();
  const navigateToPoll = () => {
    navigation.navigate('poll', { ...props });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={[{ width: '100%' }]}>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            },
          ]}
        >
          <View style={[{ flexDirection: 'row' }]}>
            <View style={[styles.box]}>
              <Text style={[globalStyles.fontBold, globalStyles.fontLight]}>
                {props.firstname.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={[globalStyles.fontBold, globalStyles.fontSm]}>
                {props.firstname + ' ' + props.lastname}
              </Text>
              <Text style={[globalStyles.fontXs]}>
                {formatDate(props.createdAt)}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={navigateToPoll}>
            <Text style={[globalStyles.primaryTxt, globalStyles.fontBold]}>
              <Icon name="heart" size={15} color="#008CFF" /> View Poll
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={[globalStyles.fontBold, globalStyles.fontTitle]}>
            {props.title}
          </Text>
          <Text style={[globalStyles.fontMuted, globalStyles.fontReg]}>
            {props.description}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderBottomWidth: 0.5,
    padding: 20,
    borderColor: '#ddd',
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
