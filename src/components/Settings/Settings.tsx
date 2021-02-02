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
import {
  selectCurrentDeskId,
  selectCurrentTaskId,
  selectCurrentDeskByDeskId,
  selectCurrentTaskByTaskId,
  selectIsLoading,
  selectSettingsCategory,
  selectCurrentCommentId,
} from '../../redux/selectors';
import {actions} from '../../redux/rootReducer';
import {navigate} from '../../services/NavigationService';
import SettingsInputBtn from '../SettingsInputBtn';

function Settings() {
  const settingsCategory = useSelector(selectSettingsCategory);
  const [activeInput, setActiveInput] = useState('');
  const [inputValue, setInputValue] = useState('');
  const deskTitle = useSelector(selectCurrentDeskByDeskId)?.title;
  const taskTitle = useSelector(selectCurrentTaskByTaskId)?.title;
  const title = getTitle();
  const currentDeskId = useSelector(selectCurrentDeskId);
  const currentTaskId = useSelector(selectCurrentTaskId);
  const currentCommentId = useSelector(selectCurrentCommentId);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  function getTitle() {
    if (settingsCategory === 'desk') {
      return deskTitle;
    } else if (settingsCategory === 'task') {
      return taskTitle;
    } else if (settingsCategory === 'comment') {
      return 'Comment';
    } else {
      return;
    }
  }

  function updateNameHandler() {
    if (settingsCategory === 'desk') {
      dispatch(actions.updateDeskTitle({id: currentDeskId, title: inputValue}));
    }

    if (settingsCategory === 'task') {
      dispatch(actions.updateTaskTitle({id: currentTaskId, title: inputValue}));
    }

    if (settingsCategory === 'comment') {
      dispatch(actions.updateComment({id: currentCommentId, text: inputValue}));
      navigate('TaskScreen');
    }

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

  function deleteItemHandler(e: GestureResponderEvent) {
    e.stopPropagation();

    if (settingsCategory === 'desk') {
      dispatch(actions.deleteDesk({id: currentDeskId}));
    }

    if (settingsCategory === 'task') {
      dispatch(actions.deleteTask({id: currentTaskId}));
      navigate('Desk');
    }

    if (settingsCategory === 'comment') {
      dispatch(actions.deleteComment({id: currentCommentId}));
      navigate('TaskScreen');
    }
  }

  return (
    <View style={styles.root} onTouchStart={() => setActiveInput('')}>
      <View style={styles.header}>
        <Text style={styles.title}>{title} settings</Text>
      </View>
      <View style={styles.container}>
        <SettingsInputBtn
          initialValue={inputValue}
          placeholder={
            settingsCategory === 'comment'
              ? 'Enter new comment'
              : `Enter new ${settingsCategory} name...`
          }
          onChangeHandler={setInputValue}
          onPressHandler={updateNameHandler}
          btnText={
            settingsCategory === 'comment'
              ? 'Update comment'
              : `Update ${settingsCategory} name`
          }
          name={'titleField'}
          isActive={activeInput === 'titleField'}
          setActiveInput={setActiveInput}
        />
        {settingsCategory === 'task' && (
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
        )}
        <TouchableOpacity
          style={styles.settingsOptionBtn}
          onPress={(e) => deleteItemHandler(e)}>
          <Text style={styles.settingsOptionText}>
            Delete {settingsCategory}
          </Text>
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
