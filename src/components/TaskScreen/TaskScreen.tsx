import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {navigate} from '../../services/NavigationService';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCommentsByCurrentTaskId,
  selectCurrentTaskByTaskId,
  selectCurrentTaskId,
} from '../../redux/selectors';
import {actions} from '../../redux/rootReducer';

function TaskScreen() {
  const [inputValue, setInputValue] = useState('');
  const currentTaskId = useSelector(selectCurrentTaskId);
  const task = useSelector(selectCurrentTaskByTaskId)!;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchComments());
  }, [dispatch]);

  const comments = useSelector(selectCommentsByCurrentTaskId);

  function navigateToSettings() {
    dispatch(actions.setSettingsCategory({category: 'task'}));
    navigate('Settings');
  }

  function handleAddComment() {
    dispatch(actions.addComment({text: inputValue, id: currentTaskId}));
    setInputValue('');
  }

  function handleCommentPress(id: number) {
    dispatch(actions.setCurrentComment({id}));
    dispatch(actions.setSettingsCategory({category: 'comment'}));
    navigate('Settings');
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={navigateToSettings}>
          <ImageBackground
            style={styles.settingsIcon}
            source={require('../../assets/img/settings.png')}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>
        <Text style={styles.descriptionDeclaration}>Description:</Text>{' '}
        {task.description ? task.description : 'add description'}
      </Text>
      <Text style={styles.commentsHeader}>Comments</Text>
      <ScrollView>
        {comments.map((comment) => {
          return (
            <TouchableOpacity
              key={comment.id}
              onPress={() => {
                handleCommentPress(comment.id);
              }}>
              <View style={styles.commentWrapper}>
                <Text style={styles.commentAuthor}>
                  {comment.author}:{' '}
                  <Text style={styles.commentText}>{comment.text}</Text>
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.commentFieldWrapper}>
        <ImageBackground
          style={styles.commentIcon}
          source={require('../../assets/img/comment.png')}
        />
        <TextInput
          style={styles.commentInput}
          placeholder={'Add a comment...'}
          defaultValue={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity
          style={styles.addCommentBtn}
          onPress={handleAddComment}>
          <ImageBackground
            style={styles.addCommentIcon}
            source={require('../../assets/img/addBtn.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TaskScreen;

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: 'white',
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
  description: {
    padding: 15,
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  descriptionDeclaration: {
    fontSize: 15,
    lineHeight: 17,
    padding: 15,
    color: '#72A8BC',
    textTransform: 'uppercase',
  },
  commentsHeader: {
    fontSize: 15,
    lineHeight: 17,
    padding: 15,
    color: '#72A8BC',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  commentWrapper: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  commentAuthor: {
    fontSize: 17,
    fontWeight: '700',
  },
  commentText: {
    fontSize: 17,
    fontWeight: '400',
  },
  commentFieldWrapper: {
    paddingLeft: 48,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  commentIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 20,
    left: 16,
  },
  commentInput: {
    padding: 0,
    fontSize: 17,
    lineHeight: 20,
    flexGrow: 1,
  },
  addCommentBtn: {
    width: 16,
    height: 16,
  },
  addCommentIcon: {
    width: 16,
    height: 16,
  },
});
