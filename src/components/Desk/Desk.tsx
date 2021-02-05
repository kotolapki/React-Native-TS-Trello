import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {navigate} from '../../services/NavigationService';
import {
  selectCurrentDeskId,
  selectDesks,
  selectIsLoading,
  selectTasks,
} from '../../redux/selectors';
import {actions} from '../../redux/rootReducer';
import Task from '../Task';
import AddField from '../AddField';

function Desk() {
  const [taskInput, setTaskInput] = useState('');
  const [title, setTitle] = useState('');
  const [isCheckedVisible, setIsCheckedVisible] = useState(false);
  const desks = useSelector(selectDesks);
  const tasks = useSelector(selectTasks);
  const currentDeskId = useSelector(selectCurrentDeskId);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    desks.filter((desk) => {
      if (desk.id === currentDeskId) {
        setTitle(desk.title);
      }
    });
  }, [desks, currentDeskId]);

  function addNewTaskHandler() {
    if (taskInput.length > 0) {
      dispatch(actions.addNewTask({title: taskInput, deskId: currentDeskId}));
      setTaskInput('');
    }
  }

  function navigateToSettings() {
    navigate('DeskSettings');
  }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={navigateToSettings}>
          <ImageBackground
            style={styles.settingsIcon}
            source={require('../../assets/img/settings.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.deskContainer}>
        <View style={styles.addFieldWrapper}>
          <AddField
            initialValue={taskInput}
            placeholder={'Enter task name...'}
            onChangeHandler={setTaskInput}
            onPressHandler={addNewTaskHandler}
          />
        </View>
        <View style={styles.tasksContainer}>
          {tasks
            .filter(
              (task) =>
                task.columnId === currentDeskId && task.checked === false,
            )
            .map((task, index) => {
              return <Task task={task} key={index} />;
            })}
        </View>
        <TouchableOpacity
          style={styles.changeVisibilityBtn}
          onPress={() => setIsCheckedVisible((prev) => !prev)}>
          <Text style={styles.changeVisibilityBtnText}>
            {isCheckedVisible ? 'Hide checked tasks' : 'Show checked tasks'}
          </Text>
        </TouchableOpacity>
        <View>
          {isCheckedVisible &&
            tasks
              .filter(
                (task) =>
                  task.columnId === currentDeskId && task.checked === true,
              )
              .map((task, index) => {
                return <Task task={task} key={index} />;
              })}
        </View>
      </View>
      <Spinner visible={isLoading} textContent={'Loading...'} />
    </ScrollView>
  );
}

export default Desk;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  deskContainer: {
    paddingVertical: 15,
  },
  header: {
    position: 'relative',
  },
  title: {
    paddingVertical: 22,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  settingsBtn: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 20,
    right: 15,
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  addFieldWrapper: {
    paddingHorizontal: 15,
  },
  tasksContainer: {
    marginBottom: 21,
  },
  changeVisibilityBtn: {
    marginBottom: 21,
    paddingHorizontal: 17,
    paddingTop: 8,
    paddingBottom: 7,
    alignSelf: 'center',
    backgroundColor: '#BFB393',
    borderRadius: 15,
  },
  changeVisibilityBtnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    lineHeight: 14,
    textTransform: 'uppercase',
  },
});
