import {Task} from './../../types';
import {takeEvery, put, call, select} from 'redux-saga/effects';
import {actions} from './rootReducer';
import {navigate} from '../services/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selectToken, selectUser} from './selectors';
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
  const token = yield select(selectToken);

  try {
    const response = yield call(api.addNewDesk, action.payload.title, token);
    const {title, id} = response.data;
    yield put(actions.addNewDeskSuccess({title, id}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* fetchDesksFlow() {
  const token = yield select(selectToken);

  try {
    const desks = yield call(api.fetchDesks, token);
    yield put(actions.fetchDesksSuccess({desks}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* fetchTasksFlow(action: ReturnType<typeof actions.fetchTasks>) {
  const token = yield select(selectToken);

  try {
    const tasks = yield call(api.fetchTasks, token);
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
  const token = yield select(selectToken);

  try {
    const response = yield call(
      api.addNewTask,
      token,
      action.payload.title,
      action.payload.deskId,
    );

    const {title, id, deskId} = response;

    yield put(actions.addNewTaskSuccess({title, id, columnId: deskId}));
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateTaskCheckedFlow(
  action: ReturnType<typeof actions.updateTaskChecked>,
) {
  const token = yield select(selectToken);

  try {
    const response = yield call(api.updateTask, token, action.payload.id, {
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
  const token = yield select(selectToken);

  try {
    const response = yield call(api.updateTask, token, action.payload.id, {
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
  const token = yield select(selectToken);

  try {
    const response = yield call(api.updateTask, token, action.payload.id, {
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
  const token = yield select(selectToken);

  try {
    const response = yield call(api.deleteTask, token, action.payload.id);

    if (response.statusText === 'OK') {
      yield put(actions.deleteTaskSuccess({id: action.payload.id}));
    }
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateDeskTitleFlow(
  action: ReturnType<typeof actions.updateDeskTitle>,
) {
  const token = yield select(selectToken);

  try {
    const response = yield call(
      api.updateDeskTitle,
      token,
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
  const token = yield select(selectToken);

  try {
    const response = yield call(api.deleteDesk, token, action.payload.id);

    if (response.statusText === 'OK') {
      yield put(actions.deleteDeskSuccess({id: action.payload.id}));
      yield call(navigate, 'Main');
    }
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* fetchCommentsFlow() {
  const token = yield select(selectToken);
  const user = yield select(selectUser);

  try {
    const response = yield call(api.fetchComments, token);
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
  const token = yield select(selectToken);

  try {
    const response = yield call(
      api.addComment,
      token,
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
  const token = yield select(selectToken);

  try {
    const response = yield call(
      api.updateComment,
      token,
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
  const token = yield select(selectToken);

  try {
    const response = yield call(api.deleteComment, token, action.payload.id);

    if (response.status === 200) {
      yield put(actions.deleteCommentSuccess());
    }
  } catch (error) {
    yield put(actions.fetchFailure(error.message));
    yield call(navigate, 'Error');
  }
}
