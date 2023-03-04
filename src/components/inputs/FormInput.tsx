import { TextInput } from 'react-native';

const FormInput = (props: any) => {
  const {
    placeholder,
    style,
    onFocus,
    onBlur,
    defaultValue,
    onChangeText,
    name,
  } = props;

  return (
    <TextInput
      placeholder={placeholder}
      style={style}
      onFocus={onFocus}
      onBlur={onBlur}
      defaultValue={defaultValue}
      onChangeText={(e) => onChangeText(e, name)}
      returnKeyType={'next'}
    />
  );
};

export default FormInput;
