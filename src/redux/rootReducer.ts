import {createSlice, PayloadAction, CaseReducer} from '@reduxjs/toolkit';
import {Task, Comment, State, Desk} from './../../types';

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

const signIn: CaseReducer<
  State,
  PayloadAction<{email: string; password: string}>
> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const signUp: CaseReducer<
  State,
  PayloadAction<{email: string; username: string; password: string}>
> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const addNewDesk: CaseReducer<State, PayloadAction<{title: string}>> = (
  state,
) => {
  return {
    ...state,
    isLoading: true,
  };
};

const fetchTasks: CaseReducer<State, PayloadAction<{deskId: number}>> = (
  state,
) => {
  return {
    ...state,
    isLoading: true,
  };
};

const addNewTask: CaseReducer<
  State,
  PayloadAction<{title: string; deskId: number}>
> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const updateTaskChecked: CaseReducer<
  State,
  PayloadAction<{id: number; checked: boolean}>
> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const updateTaskTitle: CaseReducer<
  State,
  PayloadAction<{id: number; title: string}>
> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const deleteTask: CaseReducer<State, PayloadAction<{id: number}>> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const updateTaskDescription: CaseReducer<
  State,
  PayloadAction<{id: number; description: string}>
> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const updateDeskTitle: CaseReducer<
  State,
  PayloadAction<{id: number; title: string}>
> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const deleteDesk: CaseReducer<State, PayloadAction<{id: number}>> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const addComment: CaseReducer<
  State,
  PayloadAction<{text: string; id: number}>
> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const updateComment: CaseReducer<
  State,
  PayloadAction<{id: number; text: string}>
> = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const deleteComment: CaseReducer<State, PayloadAction<{id: number}>> = (
  state,
) => {
  return {
    ...state,
    isLoading: true,
  };
};

export const rootReducer = createSlice({
  name: 'rootReducer',
  initialState,
  reducers: {
    signIn,
    signInSuccess: (
      state: State,
      action: PayloadAction<{name: string; token: string}>,
    ) => {
      return {
        ...state,
        isLoading: false,
        user: {name: action.payload.name, token: action.payload.token},
      };
    },
    fetchFailure: (
      state: State,
      action: PayloadAction<{errorMessage: string}>,
    ) => {
      return {...state, isLoading: false, error: action.payload.errorMessage};
    },
    signUp,
    signUpSuccess: (
      state: State,
      action: PayloadAction<{name: string; token: string}>,
    ) => {
      return {
        ...state,
        isLoading: false,
        user: {
          name: action.payload.name,
          token: action.payload.token,
        },
      };
    },
    signOut: (state: State) => {
      return {...state};
    },
    signOutSuccess: (state: State) => {
      return {...state, user: {name: '', token: ''}};
    },
    addNewDesk,
    addNewDeskSuccess: (
      state: State,
      action: PayloadAction<{title: string; id: number}>,
    ) => {
      return {
        ...state,
        isLoading: false,
        desks: [...state.desks, action.payload],
      };
    },
    fetchDesks: (state: State) => {
      return {...state, isLoading: true};
    },
    fetchDesksSuccess: (
      state: State,
      action: PayloadAction<{desks: Desk[]}>,
    ) => {
      return {...state, isLoading: false, desks: action.payload.desks};
    },
    fetchTasks,
    fetchTasksSuccess: (
      state: State,
      action: PayloadAction<{tasks: Task[]; deskId: number}>,
    ) => {
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
        currentDeskId: action.payload.deskId,
      };
    },
    addNewTask,
    addNewTaskSuccess: (
      state: State,
      action: PayloadAction<{title: string; id: number; columnId: number}>,
    ) => {
      return {
        ...state,
        isLoading: false,
        tasks: [
          ...state.tasks,
          {
            title: action.payload.title,
            description: '',
            id: action.payload.id,
            columnId: action.payload.columnId,
            checked: false,
            commentsIds: [],
          },
        ],
      };
    },
    updateTaskChecked,
    updateTaskCheckedSuccess: (
      state: State,
      action: PayloadAction<{id: number; checked: boolean}>,
    ) => {
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
    },
    updateTaskTitle,
    updateTaskTitleSuccess: (
      state: State,
      action: PayloadAction<{id: number; title: string}>,
    ) => {
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
    },
    updateTaskDescription,
    updateTaskDescriptionSuccess: (
      state: State,
      action: PayloadAction<{id: number; description: string}>,
    ) => {
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
    },
    deleteTask,
    deleteTaskSuccess: (state: State, action: PayloadAction<{id: number}>) => {
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    },
    updateDeskTitle,
    updateDeskTitleSuccess: (
      state: State,
      action: PayloadAction<{id: number; title: string}>,
    ) => {
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
    },
    deleteDesk,
    deleteDeskSuccess: (state: State, action: PayloadAction<{id: number}>) => {
      return {
        ...state,
        isLoading: false,
        desks: state.desks.filter((desk) => desk.id !== action.payload.id),
      };
    },
    fetchComments: (state: State) => {
      return {...state, isLoading: true};
    },
    fetchCommentsSuccess: (
      state: State,
      action: PayloadAction<{comments: Comment[]}>,
    ) => {
      return {
        ...state,
        isLoading: false,
        comments: action.payload.comments.filter(
          (comment: Comment) => comment.taskId === state.currentTaskId,
        ),
      };
    },
    setCurrentTask: (state: State, action: PayloadAction<{id: number}>) => {
      return {...state, currentTaskId: action.payload.id};
    },
    setCurrentComment: (state: State, action: PayloadAction<{id: number}>) => {
      return {...state, currentCommentId: action.payload.id};
    },
    setSettingsCategory: (
      state: State,
      action: PayloadAction<{category: string}>,
    ) => {
      return {...state, settingsCategory: action.payload.category};
    },
    addComment,
    addCommentSuccess: (state: State, action: PayloadAction<Comment>) => {
      return {
        ...state,
        isLoading: false,
        comments: [...state.comments, action.payload],
      };
    },
    updateComment,
    updateCommentSuccess: (
      state: State,
      action: PayloadAction<{text: string}>,
    ) => {
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
    },
    deleteComment,
    deleteCommentSuccess: (state: State) => {
      return {
        ...state,
        isLoading: false,
        comments: state.comments.filter(
          (comment) => comment.id !== state.currentCommentId,
        ),
      };
    },
  },
});

export const actions = {...rootReducer.actions};

export default rootReducer.reducer;
