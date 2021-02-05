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
import {selectIsLoading, selectCurrentCommentId} from '../../redux/selectors';
import {actions} from '../../redux/rootReducer';
import {navigate} from '../../services/NavigationService';
import SettingsInputBtn from '../SettingsInputBtn';
import SettingsHeader from '../SettingsHeader';

function Settings() {
  const [activeInput, setActiveInput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const currentCommentId = useSelector(selectCurrentCommentId);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  function updateNameHandler() {
    dispatch(actions.updateComment({id: currentCommentId, text: inputValue}));
    navigate('TaskScreen');
    setInputValue('');
  }

  function deleteCommentHandler(e: GestureResponderEvent) {
    e.stopPropagation();
    dispatch(actions.deleteComment({id: currentCommentId}));
    navigate('TaskScreen');
  }

  return (
    <View style={styles.root} onTouchStart={() => setActiveInput('')}>
      <SettingsHeader title={'Comment'} />
      <View style={styles.container}>
        <SettingsInputBtn
          initialValue={inputValue}
          placeholder={'Enter new comment text...'}
          onChangeHandler={setInputValue}
          onPressHandler={updateNameHandler}
          btnText={'Update comment text'}
          name={'titleField'}
          isActive={activeInput === 'titleField'}
          setActiveInput={setActiveInput}
        />
        <TouchableOpacity
          style={styles.settingsOptionBtn}
          onPress={(e) => deleteCommentHandler(e)}>
          <Text style={styles.settingsOptionText}>Delete comment</Text>
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
