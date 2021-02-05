import {State} from './../../types';

export function selectState(state: State) {
  return state;
}

export function selectUser(state: State) {
  return state.user;
}

export function selectIsLoading(state: State) {
  return state.isLoading;
}

export function selectToken(state: State) {
  return state.user.token;
}

export function selectDesks(state: State) {
  return state.desks;
}

export function selectTasks(state: State) {
  return state.tasks;
}

export function selectCurrentDeskId(state: State) {
  return state.currentDeskId;
}

export function selectCurrentTaskId(state: State) {
  return state.currentTaskId;
}

export function selectCurrentCommentId(state: State) {
  return state.currentCommentId;
}

export function selectCurrentDeskByDeskId(state: State) {
  return state.desks.find((desk) => desk.id === state.currentDeskId);
}

export function selectCurrentTaskByTaskId(state: State) {
  return state.tasks.find((task) => task.id === state.currentTaskId);
}

export function selectCurrentTaskDescription(state: State) {
  return state.tasks.find((task) => task.id === state.currentTaskId)
    ?.description;
}

export function selectCommentsByCurrentTaskId(state: State) {
  return state.comments.filter(
    (comment) => (comment.taskId = state.currentTaskId),
  );
}

export function selectCommentByCurrentCommentId(state: State) {
  return state.comments.find(
    (comment) => comment.id === state.currentCommentId,
  );
}
