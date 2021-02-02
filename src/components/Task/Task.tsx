import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import {navigate} from '../../services/NavigationService';
import {useDispatch} from 'react-redux';
import {Task as TaskType} from '../../../types';
import {actions} from '../../redux/rootReducer';

interface TaskProps {
  task: TaskType;
}

function Task({task}: TaskProps) {
  const dispatch = useDispatch();

  function onCheckboxPress(e: GestureResponderEvent) {
    e.stopPropagation();
    dispatch(actions.updateTaskChecked({id: task.id, checked: task.checked}));
  }

  function onTaskPress() {
    dispatch(actions.setCurrentTask({id: task.id}));
    navigate('TaskScreen');
  }

  return (
    <SwipeRow rightOpenValue={-70} stopRightSwipe={-70} disableRightSwipe>
      <TouchableOpacity
        style={styles.hiddenItem}
        onPress={() => dispatch(actions.deleteTask({id: task.id}))}>
        <Text style={styles.hiddenText}>Delete</Text>
      </TouchableOpacity>

      <View style={styles.visibleItemWrapper}>
        <TouchableOpacity style={styles.visibleItem} onPress={onTaskPress}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={(e) => onCheckboxPress(e)}>
            {task.checked && (
              <ImageBackground
                source={require('../../assets/img/checked.png')}
                style={styles.checkedImg}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.text}>
            {task.title} {task.checked}
          </Text>
        </TouchableOpacity>
      </View>
    </SwipeRow>
  );
}

export default Task;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
  },
  visibleItem: {
    paddingHorizontal: 15,
    paddingVertical: 22,
    paddingLeft: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
  },
  visibleItemWrapper: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  hiddenItem: {
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 15,
    backgroundColor: '#AC5253',
  },
  hiddenText: {
    fontSize: 13,
    lineHeight: 15,
    color: 'white',
    textAlign: 'right',
  },
  checkbox: {
    marginRight: 15,
    paddingTop: 3,
    paddingLeft: 3,
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
  },
  checkedImg: {
    width: 14,
    height: 13,
  },
});
