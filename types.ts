export interface Comment {
  author: string;
  text: string;
  id: number;
  taskId: number;
}

export interface Task {
  title: string;
  id: number;
  description: string;
  checked: boolean;
  columnId: number;
  commentsIds: [];
}

export interface Desk {
  title: string;
  id: number;
}

export interface State {
  user: {
    name: string;
    token: string;
  };
  error: string;
  isLoading: boolean;
  currentDeskId: number;
  currentTaskId: number;
  currentCommentId: number;
  settingsCategory: string;
  desks: Desk[];
  tasks: Task[];
  comments: Comment[];
}

export interface Action {
  type: string;
  payload: {
    username?: string;
    title?: string;
    id?: string;
    deskId?: string;
    description?: string;
    author?: string;
    text?: string;
    taskId?: string;
  };
}
