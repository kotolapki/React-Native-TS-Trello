import React from 'react';
import AddField from '../AddField';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface SettingsInputBtnProps {
  initialValue: string;
  placeholder: string;
  onChangeHandler: (text: string) => void;
  onPressHandler: () => void;
  btnText: string;
  name: string;
  isActive: boolean;
  setActiveInput: (name: string) => void;
}

function SettingsInputBtn({
  initialValue,
  placeholder,
  onChangeHandler,
  onPressHandler,
  btnText,
  name,
  isActive,
  setActiveInput,
}: SettingsInputBtnProps) {
  return (
    <View onTouchStart={(e) => e.stopPropagation()}>
      {isActive ? (
        <AddField
          initialValue={initialValue}
          placeholder={placeholder}
          onChangeHandler={onChangeHandler}
          onPressHandler={onPressHandler}
        />
      ) : (
        <TouchableOpacity
          style={styles.settingsOptionBtn}
          onPress={() => setActiveInput(name)}>
          <Text style={styles.settingsOptionText}>{btnText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default SettingsInputBtn;

const styles = StyleSheet.create({
  settingsOptionBtn: {
    marginBottom: 20,
    paddingTop: 8,
    paddingBottom: 7,
    paddingHorizontal: 23,
    borderRadius: 15,
    backgroundColor: '#BFB393',
  },
  settingsOptionText: {
    fontSize: 17,
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
