import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface SettingHeaderProps {
  title: string;
}

function SettingsHeader({title}: SettingHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title} settings</Text>
    </View>
  );
}

export default SettingsHeader;

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    paddingVertical: 22,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
