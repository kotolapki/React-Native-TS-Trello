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
import {selectCurrentTaskId, selectIsLoading} from '../../redux/selectors';
import {actions} from '../../redux/rootReducer';
import {navigate} from '../../services/NavigationService';
import SettingsInputBtn from '../SettingsInputBtn';
import SettingsHeader from '../SettingsHeader';

function Settings() {
  const [activeInput, setActiveInput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const currentTaskId = useSelector(selectCurrentTaskId);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  function updateNameHandler() {
    dispatch(actions.updateTaskTitle({id: currentTaskId, title: inputValue}));
    navigate('TaskScreen');
    setInputValue('');
  }

  function updateDescriptionHandler() {
    dispatch(
      actions.updateTaskDescription({
        id: currentTaskId,
        description: inputValue,
      }),
    );
    setInputValue('');
    navigate('TaskScreen');
  }

  function deleteTaskHandler(e: GestureResponderEvent) {
    e.stopPropagation();
    dispatch(actions.deleteTask({id: currentTaskId}));
    navigate('Desk');
  }

  return (
    <View style={styles.root} onTouchStart={() => setActiveInput('')}>
      <SettingsHeader title={'Task'} />
      <View style={styles.container}>
        <SettingsInputBtn
          initialValue={inputValue}
          placeholder={'Enter new task name...'}
          onChangeHandler={setInputValue}
          onPressHandler={updateNameHandler}
          btnText={'Update task name'}
          name={'titleField'}
          isActive={activeInput === 'titleField'}
          setActiveInput={setActiveInput}
        />
        <SettingsInputBtn
          initialValue={inputValue}
          placeholder={'Enter new description...'}
          onChangeHandler={setInputValue}
          onPressHandler={updateDescriptionHandler}
          btnText={'Update description'}
          name={'descriptionField'}
          isActive={activeInput === 'descriptionField'}
          setActiveInput={setActiveInput}
        />
        <TouchableOpacity
          style={styles.settingsOptionBtn}
          onPress={(e) => deleteTaskHandler(e)}>
          <Text style={styles.settingsOptionText}>Delete task</Text>
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
