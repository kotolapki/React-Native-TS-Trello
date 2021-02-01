import React from 'react';
import {View, Text} from 'react-native';
import {State} from '../../../types';
import {useSelector} from 'react-redux';

function Error() {
  const errorMessage = useSelector((state: State) => state.error);
  return (
    <View>
      <Text>{errorMessage}</Text>
    </View>
  );
}

export default Error;
