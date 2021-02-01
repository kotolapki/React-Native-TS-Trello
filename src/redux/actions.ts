import {Desk, Task, Comment} from './../../types';
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  ADD_NEW_DESK,
  ADD_NEW_DESK_REQUEST,
  ADD_NEW_DESK_SUCCESS,
  ADD_NEW_DESK_FAILURE,
  FETCH_DESKS,
  FETCH_DESKS_REQUEST,
  FETCH_DESKS_SUCCESS,
  FETCH_DESKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  ADD_NEW_TASK_REQUEST,
  ADD_NEW_TASK_FAILURE,
  ADD_NEW_TASK_SUCCESS,
  UPDATE_TASK_CHECKED_REQUEST,
  UPDATE_TASK_CHECKED_SUCCESS,
  UPDATE_TASK_CHECKED_FAILURE,
  UPDATE_TASK_TITLE_REQUEST,
  UPDATE_TASK_TITLE_SUCCESS,
  UPDATE_TASK_TITLE_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  UPDATE_DESK_TITLE_REQUEST,
  UPDATE_DESK_TITLE_FAILURE,
  UPDATE_DESK_TITLE_SUCCESS,
  DELETE_DESK_REQUEST,
  DELETE_DESK_SUCCESS,
  DELETE_DESK_FAILURE,
  SET_CURRENT_TASK,
  SET_SETTINGS_CATEGORY,
  UPDATE_TASK_DESC_REQUEST,
  UPDATE_TASK_DESC_SUCCESS,
  UPDATE_TASK_DESC_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  SET_CURRENT_COMMENT,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from './types';

export function signIn(email: string, password: string) {
  return {
    type: SIGN_IN,
    payload: {
      email,
      password,
    },
  };
}

export function signUp(email: string, name: string, password: string) {
  return {
    type: SIGN_UP,
    payload: {
      email,
      name,
      password,
    },
  };
}

export function signUpRequest() {
  return {
    type: SIGN_UP_REQUEST,
  };
}

export function signUpSuccess(name: string, token: string) {
  return {
    type: SIGN_UP_SUCCESS,
    payload: {
      name,
      token,
    },
  };
}

export function signUpFailure(errorMessage: string) {
  return {
    type: SIGN_UP_FAILURE,
    payload: {
      errorMessage,
    },
  };
}

export function signInRequest() {
  return {
    type: SIGN_IN_REQUEST,
  };
}

export function signInSuccess(name: string, token: string) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      name,
      token,
    },
  };
}

export function signInFailure(errorText: string) {
  return {
    type: SIGN_IN_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function addNewDesk(title: string) {
  return {
    type: ADD_NEW_DESK,
    payload: {
      title,
    },
  };
}

export function addNewDeskRequest() {
  return {
    type: ADD_NEW_DESK_REQUEST,
  };
}

export function addNewDeskSuccess(title: string, id: number) {
  return {
    type: ADD_NEW_DESK_SUCCESS,
    payload: {
      title,
      id,
    },
  };
}

export function addNewDeskFailure(errorText: string) {
  return {
    type: ADD_NEW_DESK_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function fetchDesks() {
  return {
    type: FETCH_DESKS,
  };
}

export function fetchDesksRequest() {
  return {
    type: FETCH_DESKS_REQUEST,
  };
}

export function fetchDesksSuccess(desks: Desk[]) {
  return {
    type: FETCH_DESKS_SUCCESS,
    payload: {
      desks,
    },
  };
}

export function fetchDesksFailure(errorText: string) {
  return {
    type: FETCH_DESKS_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function fetchTasksRequest(deskId: number) {
  return {
    type: FETCH_TASKS_REQUEST,
    payload: {
      deskId,
    },
  };
}

export function fetchTasksSuccess(tasks: Task[], deskId: number) {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload: {
      tasks,
      deskId,
    },
  };
}

export function fetchTasksFailure(errorText: string) {
  return {
    type: FETCH_TASKS_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function addNewTaskRequest(title: string, deskId: number) {
  return {
    type: ADD_NEW_TASK_REQUEST,
    payload: {
      title,
      deskId,
    },
  };
}

export function addNewTaskSuccess(title: string, id: number, columnId: number) {
  return {
    type: ADD_NEW_TASK_SUCCESS,
    payload: {
      title,
      description: '',
      id,
      columnId,
      checked: false,
      commentsIds: [],
    },
  };
}

export function addNewTaskFailure(errorText: string) {
  return {
    type: ADD_NEW_TASK_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function updateTaskCheckedRequest(id: number, checked: boolean) {
  return {
    type: UPDATE_TASK_CHECKED_REQUEST,
    payload: {
      id,
      checked,
    },
  };
}

export function updateTaskCheckedSuccess(id: number, checked: boolean) {
  return {
    type: UPDATE_TASK_CHECKED_SUCCESS,
    payload: {
      id,
      checked,
    },
  };
}

export function updateTaskCheckedFailure(errorText: string) {
  return {
    type: UPDATE_TASK_CHECKED_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function updateTaskTitleRequest(id: number, title: string) {
  return {
    type: UPDATE_TASK_TITLE_REQUEST,
    payload: {
      id,
      title,
    },
  };
}

export function updateTaskTitleSuccess(id: number, title: string) {
  return {
    type: UPDATE_TASK_TITLE_SUCCESS,
    payload: {
      id,
      title,
    },
  };
}

export function updateTaskTitleFailure(errorText: string) {
  return {
    type: UPDATE_TASK_TITLE_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function updateTaskDescRequest(id: number, description: string) {
  return {
    type: UPDATE_TASK_DESC_REQUEST,
    payload: {
      id,
      description,
    },
  };
}

export function updateTaskDescSuccess(id: number, description: string) {
  return {
    type: UPDATE_TASK_DESC_SUCCESS,
    payload: {
      id,
      description,
    },
  };
}

export function updateTaskDescFailure(errorText: string) {
  return {
    type: UPDATE_TASK_DESC_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function deleteTaskRequest(id: number) {
  return {
    type: DELETE_TASK_REQUEST,
    payload: {
      id,
    },
  };
}

export function deleteTaskSuccess(id: number) {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: {
      id,
    },
  };
}

export function deleteTaskFailure(errorText: string) {
  return {
    type: DELETE_TASK_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function updateDeskTitleRequest(id: number, title: string) {
  return {
    type: UPDATE_DESK_TITLE_REQUEST,
    payload: {
      id,
      title,
    },
  };
}

export function updateDeskTitleSuccess(id: number, title: string) {
  return {
    type: UPDATE_DESK_TITLE_SUCCESS,
    payload: {
      id,
      title,
    },
  };
}

export function updateDeskTitleFailure(errorText: string) {
  return {
    type: UPDATE_DESK_TITLE_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function deleteDeskRequest(id: number) {
  return {
    type: DELETE_DESK_REQUEST,
    payload: {
      id,
    },
  };
}

export function deleteDeskSuccess(id: number) {
  return {
    type: DELETE_DESK_SUCCESS,
    payload: {
      id,
    },
  };
}

export function deleteDeskFailure(errorText: string) {
  return {
    type: DELETE_DESK_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function setCurrentTask(id: number) {
  return {
    type: SET_CURRENT_TASK,
    payload: {
      id,
    },
  };
}

export function setSettingsCategory(category: string) {
  return {
    type: SET_SETTINGS_CATEGORY,
    payload: {
      category,
    },
  };
}

export function fetchCommentsRequest() {
  return {
    type: FETCH_COMMENTS_REQUEST,
  };
}

export function fetchCommentsSuccess(comments: Comment[]) {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    payload: {
      comments,
    },
  };
}

export function fetchCommentsFailure(errorText: string) {
  return {
    type: FETCH_COMMENTS_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function addCommentRequest(text: string, id: number) {
  return {
    type: ADD_COMMENT_REQUEST,
    payload: {
      text,
      id,
    },
  };
}

export function addCommentSuccess(
  author: string,
  text: string,
  id: number,
  taskId: string,
) {
  return {
    type: ADD_COMMENT_SUCCESS,
    payload: {
      author,
      text,
      id,
      taskId,
    },
  };
}

export function addCommentFailure(errorText: string) {
  return {
    type: ADD_COMMENT_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function setCurrentComment(id: number) {
  return {
    type: SET_CURRENT_COMMENT,
    payload: {
      id,
    },
  };
}

export function updateCommentRequest(id: number, text: string) {
  return {
    type: UPDATE_COMMENT_REQUEST,
    payload: {
      id,
      text,
    },
  };
}

export function updateCommentSuccess(text: string) {
  return {
    type: UPDATE_COMMENT_SUCCESS,
    payload: {
      text,
    },
  };
}

export function updateCommentFailure(errorText: string) {
  return {
    type: UPDATE_COMMENT_FAILURE,
    payload: {
      errorText,
    },
  };
}

export function deleteCommentRequest(id: number) {
  return {
    type: DELETE_COMMENT_REQUEST,
    payload: {
      id,
    },
  };
}

export function deleteCommentSuccess() {
  return {
    type: DELETE_COMMENT_SUCCESS,
  };
}

export function deleteCommentFailure(errorText: string) {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: {
      errorText,
    },
  };
}
