import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

export interface AddFieldProps {
  initialValue: string;
  placeholder: string;
  onChangeHandler: (text: string) => void;
  onPressHandler: () => void;
}

function AddField({
  initialValue,
  placeholder,
  onChangeHandler,
  onPressHandler,
}: AddFieldProps) {
  return (
    <View style={styles.root} onTouchStart={(e) => e.stopPropagation()}>
      <TouchableOpacity style={styles.addBtn} onPress={onPressHandler}>
        <ImageBackground
          source={require('../../assets/img/addBtn.png')}
          style={styles.addBtnBg}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'#9C9C9C'}
        defaultValue={initialValue}
        onChangeText={(text) => onChangeHandler(text)}
      />
    </View>
  );
}

export default AddField;

const styles = StyleSheet.create({
  root: {
    marginBottom: 15,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  addBtn: {
    marginRight: 14,
    width: 22,
    height: 22,
  },
  addBtnBg: {
    width: 22,
    height: 22,
  },
  input: {
    padding: 0,
    height: 21,
    fontSize: 17,
    lineHeight: 21,
    color: 'black',
  },
});
