import { TextInput, Text, View } from 'react-native';

import { StyleSheet } from 'react-native';

const FormInput = (props: any) => {
  const {
    placeholder,
    style,
    onFocus,
    onBlur,
    defaultValue,
    onChangeText,
    name,
    errors,
  } = props;

  const privateText = ['password'];
  return (
    <View>
      {errors ? <Text style={styles.formError}>{errors}</Text> : null}
      <TextInput
        placeholder={placeholder}
        style={style}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={defaultValue}
        onChangeText={(e) => onChangeText(e, name)}
        returnKeyType={'next'}
        secureTextEntry={privateText.includes(name)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formError: {
    color: '#cf2343',
    fontSize: 12,
    padding: 8,
  },
});

export default FormInput;
