import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import {selectCurrentDeskId, selectIsLoading} from '../../redux/selectors';
import {actions} from '../../redux/rootReducer';
import SettingsInputBtn from '../SettingsInputBtn';
import SettingsHeader from '../SettingsHeader';
import {navigate} from '../../services/NavigationService';

function Settings() {
  const [activeInput, setActiveInput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const currentDeskId = useSelector(selectCurrentDeskId);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  function updateDeskNameHandler() {
    dispatch(actions.updateDeskTitle({id: currentDeskId, title: inputValue}));
    setInputValue('');
    navigate('Desk');
  }

  function deleteDeskHandler(e: GestureResponderEvent) {
    e.stopPropagation();
    dispatch(actions.deleteDesk({id: currentDeskId}));
  }

  return (
    <View style={styles.root} onTouchStart={() => setActiveInput('')}>
      <SettingsHeader title={'Desk'} />
      <View style={styles.container}>
        <SettingsInputBtn
          initialValue={inputValue}
          placeholder={'Enter new desk name...'}
          onChangeHandler={setInputValue}
          onPressHandler={updateDeskNameHandler}
          btnText={'Update desk name'}
          name={'titleField'}
          isActive={activeInput === 'titleField'}
          setActiveInput={setActiveInput}
        />
        <TouchableOpacity
          style={styles.settingsOptionBtn}
          onPress={(e) => deleteDeskHandler(e)}>
          <Text style={styles.settingsOptionText}>Delete desk</Text>
        </TouchableOpacity>
      </View>
      <Spinner visible={isLoading} textContent={'Loading...'} />
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    padding: 15,
  },
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
