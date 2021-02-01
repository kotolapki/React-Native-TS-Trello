import {Task} from './../../types';
import {State} from '../../types';
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
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
  ADD_NEW_TASK_SUCCESS,
  ADD_NEW_TASK_FAILURE,
  UPDATE_TASK_CHECKED_SUCCESS,
  UPDATE_TASK_CHECKED_REQUEST,
  UPDATE_TASK_CHECKED_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  UPDATE_DESK_TITLE_REQUEST,
  UPDATE_DESK_TITLE_SUCCESS,
  DELETE_TASK_FAILURE,
  UPDATE_DESK_TITLE_FAILURE,
  DELETE_DESK_REQUEST,
  DELETE_DESK_SUCCESS,
  DELETE_DESK_FAILURE,
  SET_CURRENT_TASK,
  SET_SETTINGS_CATEGORY,
  UPDATE_TASK_TITLE_REQUEST,
  UPDATE_TASK_TITLE_SUCCESS,
  UPDATE_TASK_TITLE_FAILURE,
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

const initialState: State = {
  user: {
    name: '',
    token: '',
  },
  isLoading: false,
  currentDeskId: 0,
  currentTaskId: 0,
  currentCommentId: 0,
  settingsCategory: '',
  error: '',
  desks: [],
  tasks: [],
  comments: [],
};

export const rootReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case SIGN_IN:
      return {...state};
    case SIGN_UP:
      return {...state};
    case SIGN_UP_REQUEST:
      return {...state, isLoading: true};
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          name: action.payload.name,
          token: action.payload.token,
        },
      };
    case SIGN_UP_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorMessage};
    case SIGN_IN_REQUEST:
      return {...state, isLoading: true};
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {name: action.payload.name, token: action.payload.token},
      };
    case SIGN_IN_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorMessage};
    case ADD_NEW_DESK_REQUEST:
      return {...state, isLoading: true};
    case ADD_NEW_DESK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        desks: [...state.desks, action.payload],
      };
    case ADD_NEW_DESK_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorMessage};
    case FETCH_DESKS:
      return {...state};
    case FETCH_DESKS_REQUEST:
      return {...state, isLoading: true};
    case FETCH_DESKS_SUCCESS:
      return {...state, isLoading: false, desks: action.payload.desks};
    case FETCH_DESKS_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorMessage};
    case FETCH_TASKS_REQUEST:
      return {...state, isLoading: true};
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
        currentDeskId: action.payload.deskId,
      };
    case FETCH_TASKS_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorMessage};
    case ADD_NEW_TASK_REQUEST:
      return {...state, isLoading: true};
    case ADD_NEW_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: [...state.tasks, action.payload],
      };
    case ADD_NEW_TASK_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorMessage};
    case UPDATE_TASK_CHECKED_REQUEST:
      return {...state, isLoading: true};
    case UPDATE_TASK_CHECKED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.map((task: Task) => {
          if (task.id === action.payload.id) {
            return {...task, checked: action.payload.checked};
          }

          return task;
        }),
      };
    case UPDATE_TASK_CHECKED_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorMessage};
    case UPDATE_TASK_TITLE_REQUEST:
      return {...state, isLoading: true};
    case UPDATE_TASK_TITLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return {...task, title: action.payload.title};
          }

          return task;
        }),
      };
    case UPDATE_TASK_TITLE_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorMessage};
    case UPDATE_TASK_DESC_REQUEST:
      return {...state, isLoading: true};
    case UPDATE_TASK_DESC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return {...task, description: action.payload.description};
          }

          return task;
        }),
      };
    case UPDATE_TASK_DESC_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorMessage};
    case DELETE_TASK_REQUEST:
      return {...state, isLoading: true};
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    case DELETE_TASK_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorMessage};
    case UPDATE_DESK_TITLE_REQUEST:
      return {...state, isLoading: true};
    case UPDATE_DESK_TITLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        desks: state.desks.map((desk) => {
          if (desk.id === action.payload.id) {
            return {
              title: action.payload.title,
              id: action.payload.id,
            };
          } else {
            return desk;
          }
        }),
      };
    case UPDATE_DESK_TITLE_FAILURE:
      return {...state, isLoading: false, error: action.payload.error};
    case DELETE_DESK_REQUEST:
      return {...state, isLoading: true};
    case DELETE_DESK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        desks: state.desks.filter((desk) => desk.id !== action.payload.id),
      };
    case DELETE_DESK_FAILURE:
      return {...state, isLoading: false, error: action.payload.error};
    case SET_CURRENT_TASK:
      return {...state, currentTaskId: action.payload.id};
    case SET_SETTINGS_CATEGORY:
      return {...state, settingsCategory: action.payload.category};
    case FETCH_COMMENTS_REQUEST:
      return {...state, isLoading: true};
    case FETCH_COMMENTS_SUCCESS:
      return {...state, isLoading: false, comments: action.payload.comments};
    case FETCH_COMMENTS_FAILURE:
      return {...state, isLoading: false, error: action.payload.error};
    case ADD_COMMENT_REQUEST:
      return {...state, isLoading: true};
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: [...state.comments, action.payload],
      };
    case ADD_COMMENT_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorText};
    case SET_CURRENT_COMMENT:
      return {...state, currentCommentId: action.payload.id};
    case UPDATE_COMMENT_REQUEST:
      return {...state, isLoading: true};
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.map((comment) => {
          if (comment.id === state.currentCommentId) {
            return {...comment, text: action.payload.text};
          }

          return comment;
        }),
      };
    case UPDATE_COMMENT_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorText};
    case DELETE_COMMENT_REQUEST:
      return {...state, isLoading: true};
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.filter(
          (comment) => comment.id !== state.currentCommentId,
        ),
      };
    case DELETE_COMMENT_FAILURE:
      return {...state, isLoading: false, error: action.payload.errorText};
    default:
      return state;
  }
};
