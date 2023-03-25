import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { globalStyles } from '../globalStyles/GlobalStyles';

interface PillProps {
  icon: any;
  label: string;
  variant: string;
}

// <Icon name="check" size={12} color="#008CFF" />
export const Pill = ({ icon, label, variant }: PillProps) => {
  const style = () => {
    if (variant === 'success')
      return [
        globalStyles.primaryTxt,
        globalStyles.fontBold,
        globalStyles.fontXs,
      ];
    return [globalStyles.fontMuted, globalStyles.fontBold, globalStyles.fontXs];
  };

  return (
    <View style={variant === 'success' ? styles.pill : styles.disabledPill}>
      <Text style={style()}>
        {icon} {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    backgroundColor: '#EBF5FF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 100,
  },
  disabledPill: {
    backgroundColor: '#ebebeb',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 100,
  },
});
