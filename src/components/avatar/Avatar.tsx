import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface AvatarProps {
  name: string;
  size?: string;
}

export const Avatar = ({ name, size = 'large' }: AvatarProps) => {
  const setSize = (size: string) => {
    switch (size) {
      case 'large':
        return styles.container;
      case 'small':
        return styles.containerSm;
      default:
        return styles.container;
    }
  };
  return (
    <View style={setSize(size)}>
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
  containerSm: {
    width: 28,
    height: 28,
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
