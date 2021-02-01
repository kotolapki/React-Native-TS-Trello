import {
  SIGN_IN,
  SIGN_UP,
  ADD_NEW_DESK,
  FETCH_DESKS_REQUEST,
  FETCH_TASKS_REQUEST,
  ADD_NEW_TASK_REQUEST,
  UPDATE_TASK_CHECKED_REQUEST,
  DELETE_TASK_REQUEST,
  UPDATE_DESK_TITLE_REQUEST,
  DELETE_DESK_REQUEST,
  UPDATE_TASK_TITLE_REQUEST,
  UPDATE_TASK_DESC_REQUEST,
  FETCH_COMMENTS_REQUEST,
  ADD_COMMENT_REQUEST,
  UPDATE_COMMENT_REQUEST,
  DELETE_COMMENT_REQUEST,
} from './types';
import {takeEvery, put, call, select} from 'redux-saga/effects';
import {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  addNewDeskRequest,
  addNewDeskFailure,
  addNewDeskSuccess,
  fetchDesksFailure,
  fetchDesksSuccess,
  fetchTasksSuccess,
  fetchTasksFailure,
  addNewTaskFailure,
  addNewTaskSuccess,
  updateTaskCheckedFailure,
  updateTaskCheckedSuccess,
  updateTaskTitleSuccess,
  updateTaskTitleFailure,
  updateTaskDescSuccess,
  updateTaskDescFailure,
  deleteTaskFailure,
  deleteTaskSuccess,
  updateDeskTitleFailure,
  updateDeskTitleSuccess,
  deleteDeskFailure,
  deleteDeskSuccess,
  fetchCommentsFailure,
  fetchCommentsSuccess,
  addCommentFailure,
  addCommentSuccess,
  updateCommentFailure,
  updateCommentSuccess,
  deleteCommentFailure,
  deleteCommentSuccess,
} from './actions';
import {navigate} from '../services/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selectToken, selectUser} from './selectors';
import {
  addNewUser,
  signIn,
  addNewDesk,
  fetchDesks,
  fetchTasks,
  addNewTask,
  updateTask,
  deleteTask,
  updateDeskTitle,
  deleteDesk,
  fetchComments,
  AddComment,
  updateComment,
  deleteComment,
} from '../api/api';

export function* sagaWatcher() {
  yield takeEvery(SIGN_UP, signUpFlow);
  yield takeEvery(SIGN_IN, signInFlow);
  yield takeEvery(ADD_NEW_DESK, addNewDeskFlow);
  yield takeEvery(FETCH_DESKS_REQUEST, fetchDesksFlow);
  yield takeEvery(FETCH_TASKS_REQUEST, fetchTasksFlow);
  yield takeEvery(ADD_NEW_TASK_REQUEST, addNewTaskFlow);
  yield takeEvery(UPDATE_TASK_CHECKED_REQUEST, updateTaskCheckedFlow);
  yield takeEvery(DELETE_TASK_REQUEST, deleteTaskFlow);
  yield takeEvery(UPDATE_DESK_TITLE_REQUEST, updateDeskTitleFlow);
  yield takeEvery(DELETE_DESK_REQUEST, deleteDeskFlow);
  yield takeEvery(UPDATE_TASK_TITLE_REQUEST, updateTaskTitleFlow);
  yield takeEvery(UPDATE_TASK_DESC_REQUEST, updateTaskDescFlow);
  yield takeEvery(FETCH_COMMENTS_REQUEST, fetchCommentsFlow);
  yield takeEvery(ADD_COMMENT_REQUEST, addCommentFlow);
  yield takeEvery(UPDATE_COMMENT_REQUEST, updateCommentFlow);
  yield takeEvery(DELETE_COMMENT_REQUEST, deleteCommentFlow);
}

function* signUpFlow(action: any) {
  yield put(signUpRequest());

  try {
    const response = yield call(
      addNewUser,
      action.payload.email,
      action.payload.name,
      action.payload.password,
    );

    yield put(signUpSuccess(response.data.name, response.data.token));

    yield call(AsyncStorage.setItem, 'token', response.data.token);
    yield call(AsyncStorage.setItem, 'name', response.data.name);

    navigate('Main');
  } catch (error) {
    yield put(signUpFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* signInFlow(action: any) {
  yield put(signInRequest());

  try {
    const response = yield call(
      signIn,
      action.payload.email,
      action.payload.password,
    );

    yield put(signInSuccess(response.data.name, response.data.token));
    yield call(AsyncStorage.setItem, 'token', response.data.token);
    yield call(AsyncStorage.setItem, 'name', response.data.name);
    yield call(navigate, 'Main');
  } catch (error) {
    yield put(signInFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* addNewDeskFlow(action: any) {
  yield put(addNewDeskRequest());
  const token = yield select(selectToken);

  try {
    const response = yield call(addNewDesk, action.payload.title, token);
    yield put(addNewDeskSuccess(response.data.title, response.data.id));
  } catch (error) {
    yield put(addNewDeskFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* fetchDesksFlow() {
  const token = yield select(selectToken);

  try {
    const desks = yield call(fetchDesks, token);
    yield put(fetchDesksSuccess(desks));
  } catch (error) {
    yield put(fetchDesksFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* fetchTasksFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const tasks = yield call(fetchTasks, token);
    yield put(fetchTasksSuccess(tasks, action.payload.deskId));
    yield call(navigate, 'Desk');
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* addNewTaskFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const response = yield call(
      addNewTask,
      token,
      action.payload.title,
      action.payload.deskId,
    );
    yield put(
      addNewTaskSuccess(response.title, response.id, action.payload.deskId),
    );
  } catch (error) {
    yield put(addNewTaskFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateTaskCheckedFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const response = yield call(updateTask, token, action.payload.id, {
      checked: !action.payload.checked,
    });

    yield put(updateTaskCheckedSuccess(response.id, response.checked));
  } catch (error) {
    yield put(updateTaskCheckedFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateTaskTitleFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const response = yield call(updateTask, token, action.payload.id, {
      title: action.payload.title,
    });

    yield put(updateTaskTitleSuccess(response.id, response.title));
  } catch (error) {
    yield put(updateTaskTitleFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateTaskDescFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const response = yield call(updateTask, token, action.payload.id, {
      description: action.payload.description,
    });

    console.log(response);

    yield put(updateTaskDescSuccess(response.id, response.description));
  } catch (error) {
    yield put(updateTaskDescFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* deleteTaskFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const response = yield call(deleteTask, token, action.payload.id);

    if (response.statusText === 'OK') {
      yield put(deleteTaskSuccess(action.payload.id));
    }
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateDeskTitleFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const response = yield call(
      updateDeskTitle,
      token,
      action.payload.id,
      action.payload.title,
    );

    yield put(updateDeskTitleSuccess(response.id, response.title));
  } catch (error) {
    yield put(updateDeskTitleFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* deleteDeskFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const response = yield call(deleteDesk, token, action.payload.id);

    if (response.statusText === 'OK') {
      yield put(deleteDeskSuccess(action.payload.id));
      yield call(navigate, 'Main');
    }
  } catch (error) {
    yield put(deleteDeskFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* fetchCommentsFlow() {
  const token = yield select(selectToken);
  const user = yield select(selectUser);

  try {
    const response = yield call(fetchComments, token);
    const comment = response.data.map((item: any) => {
      return {
        author: user.name,
        text: item.body,
        id: item.id,
        taskId: item.cardId,
      };
    });
    yield put(fetchCommentsSuccess(comment));
  } catch (error) {
    yield put(fetchCommentsFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* addCommentFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const response = yield call(
      AddComment,
      token,
      action.payload.text,
      action.payload.id,
    );

    yield put(
      addCommentSuccess(
        response.data.user.name,
        response.data.body,
        response.data.id,
        response.data.cardId,
      ),
    );
  } catch (error) {
    yield put(addCommentFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* updateCommentFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const response = yield call(
      updateComment,
      token,
      action.payload.text,
      action.payload.id,
    );

    yield put(updateCommentSuccess(response.data.body));
  } catch (error) {
    yield put(updateCommentFailure(error.message));
    yield call(navigate, 'Error');
  }
}

function* deleteCommentFlow(action: any) {
  const token = yield select(selectToken);

  try {
    const response = yield call(deleteComment, token, action.payload.id);

    if (response.status === 200) {
      yield put(deleteCommentSuccess());
    }
  } catch (error) {
    yield put(deleteCommentFailure(error.message));
    yield call(navigate, 'Error');
  }
}
