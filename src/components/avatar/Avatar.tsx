import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface AvatarProps {
  name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.character}>{name.slice(0, 1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C1BFB5',
  },
  character: {
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },
});
