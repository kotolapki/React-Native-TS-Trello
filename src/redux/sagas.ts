import {Task} from './../../types';
import {takeEvery, put, call, select} from 'redux-saga/effects';
import {actions} from './rootReducer';
import {navigate} from '../services/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selectUser} from './selectors';
import * as api from '../api/api';

export function* sagaWatcher() {
  yield takeEvery(actions.signUp.type, signUpFlow);
  yield takeEvery(actions.signIn.type, signInFlow);
  yield takeEvery(actions.addNewDesk.type, addNewDeskFlow);
  yield takeEvery(actions.fetchDesks.type, fetchDesksFlow);
  yield takeEvery(actions.fetchTasks.type, fetchTasksFlow);
  yield takeEvery(actions.addNewTask.type, addNewTaskFlow);
  yield takeEvery(actions.updateTaskChecked.type, updateTaskCheckedFlow);
  yield takeEvery(actions.deleteTask.type, deleteTaskFlow);
  yield takeEvery(actions.updateDeskTitle.type, updateDeskTitleFlow);
  yield takeEvery(actions.deleteDesk.type, deleteDeskFlow);
  yield takeEvery(actions.updateTaskTitle.type, updateTaskTitleFlow);
  yield takeEvery(
    actions.updateTaskDescription.type,
    updateTaskDescriptionFlow,
  );
  yield takeEvery(actions.fetchComments.type, fetchCommentsFlow);
  yield takeEvery(actions.addComment.type, addCommentFlow);
  yield takeEvery(actions.updateComment.type, updateCommentFlow);
  yield takeEvery(actions.deleteComment.type, deleteCommentFlow);
  yield takeEvery(actions.signOut.type, signOutFlow);
}

function* signUpFlow(action: ReturnType<typeof actions.signUp>) {
  try {
    const response = yield call(
      api.signUp,
      action.payload.email,
      action.payload.username,
      action.payload.password,
    );

    const {name, token} = response.data;

    yield put(actions.signUpSuccess({name, token}));

    yield call(AsyncStorage.setItem, 'token', token);
    yield call(AsyncStorage.setItem, 'name', name);

    navigate('Main');
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* signOutFlow() {
  try {
    yield call(AsyncStorage.clear);
    yield put(actions.signOutSuccess());
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* signInFlow(action: ReturnType<typeof actions.signIn>) {
  try {
    const response = yield call(
      api.signIn,
      action.payload.email,
      action.payload.password,
    );

    const {name, token} = response.data;

    yield put(actions.signInSuccess({name, token}));
    yield call(AsyncStorage.setItem, 'token', token);
    yield call(AsyncStorage.setItem, 'name', name);
    yield call(navigate, 'Main');
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* addNewDeskFlow(action: ReturnType<typeof actions.addNewDesk>) {
  try {
    const response = yield call(api.addNewDesk, action.payload.title);
    const {title, id} = response.data;
    yield put(actions.addNewDeskSuccess({title, id}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* fetchDesksFlow() {
  try {
    const desks = yield call(api.fetchDesks);
    yield put(actions.fetchDesksSuccess({desks}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* fetchTasksFlow(action: ReturnType<typeof actions.fetchTasks>) {
  try {
    const tasks = yield call(api.fetchTasks);
    tasks.sort((a: Task, b: Task) => a.id - b.id);
    yield put(
      actions.fetchTasksSuccess({tasks, deskId: action.payload.deskId}),
    );
    yield call(navigate, 'Desk');
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* addNewTaskFlow(action: ReturnType<typeof actions.addNewTask>) {
  try {
    const response = yield call(
      api.addNewTask,
      action.payload.title,
      action.payload.deskId,
    );

    const {title, id, column: columnId} = response;
    yield put(actions.addNewTaskSuccess({title, id, columnId}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateTaskCheckedFlow(
  action: ReturnType<typeof actions.updateTaskChecked>,
) {
  try {
    const response = yield call(api.updateTask, action.payload.id, {
      checked: !action.payload.checked,
    });

    const {id, checked} = response;
    yield put(actions.updateTaskCheckedSuccess({id, checked}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateTaskTitleFlow(
  action: ReturnType<typeof actions.updateTaskTitle>,
) {
  try {
    const response = yield call(api.updateTask, action.payload.id, {
      title: action.payload.title,
    });

    const {id, title} = response;
    yield put(actions.updateTaskTitleSuccess({id, title}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateTaskDescriptionFlow(
  action: ReturnType<typeof actions.updateTaskDescription>,
) {
  try {
    const response = yield call(api.updateTask, action.payload.id, {
      description: action.payload.description,
    });

    const {id, description} = response;
    yield put(actions.updateTaskDescriptionSuccess({id, description}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* deleteTaskFlow(action: ReturnType<typeof actions.deleteTask>) {
  try {
    const response = yield call(api.deleteTask, action.payload.id);

    if (response.statusText === 'OK') {
      yield put(actions.deleteTaskSuccess({id: action.payload.id}));
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateDeskTitleFlow(
  action: ReturnType<typeof actions.updateDeskTitle>,
) {
  try {
    const response = yield call(
      api.updateDeskTitle,
      action.payload.id,
      action.payload.title,
    );

    const {id, title} = response;
    yield put(actions.updateDeskTitleSuccess({id, title}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* deleteDeskFlow(action: ReturnType<typeof actions.deleteDesk>) {
  try {
    const response = yield call(api.deleteDesk, action.payload.id);

    if (response.statusText === 'OK') {
      yield put(actions.deleteDeskSuccess({id: action.payload.id}));
      yield call(navigate, 'Main');
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* fetchCommentsFlow() {
  const user = yield select(selectUser);

  try {
    const response = yield call(api.fetchComments);
    const comments = response.data.map(
      (item: {
        id: number;
        body: string;
        created: string;
        cardId: number;
        userId: number;
      }) => {
        return {
          author: user.name,
          text: item.body,
          id: item.id,
          taskId: item.cardId,
        };
      },
    );
    yield put(actions.fetchCommentsSuccess({comments}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* addCommentFlow(action: ReturnType<typeof actions.addComment>) {
  try {
    const response = yield call(
      api.addComment,
      action.payload.text,
      action.payload.id,
    );

    yield put(
      actions.addCommentSuccess({
        author: response.data.user.name,
        text: response.data.body,
        id: response.data.id,
        taskId: response.data.cardId,
      }),
    );
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateCommentFlow(action: ReturnType<typeof actions.updateComment>) {
  try {
    const response = yield call(
      api.updateComment,
      action.payload.text,
      action.payload.id,
    );

    yield put(actions.updateCommentSuccess({text: response.data.body}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* deleteCommentFlow(action: ReturnType<typeof actions.deleteComment>) {
  try {
    const response = yield call(api.deleteComment, action.payload.id);

    if (response.status === 200) {
      yield put(actions.deleteCommentSuccess());
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}
