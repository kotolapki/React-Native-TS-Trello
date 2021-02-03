import httpClient from './httpClient';

export async function signUp(email: string, name: string, password: string) {
  const user = {
    email,
    name,
    password,
  };

  return httpClient.post('auth/sign-up', user, {withToken: false});
}

export async function signIn(email: string, password: string) {
  const user = {
    email,
    password,
  };

  return httpClient.post('auth/sign-in', user, {withToken: false});
}

export async function addNewDesk(title: string) {
  const desk = {
    title,
    description: '',
  };

  if (title.length === 0) {
    throw new Error('empty desk title');
  }

  return httpClient.post('columns', desk);
}

export async function fetchDesks() {
  return httpClient
    .get<Array<{id: number; title: string; userId: number}>>('columns')
    .then((response) =>
      response.data.map((desk) => {
        return {title: desk.title, id: desk.id};
      }),
    );
}

export async function fetchTasks() {
  return httpClient.get('cards').then((response) => response.data);
}

export async function addNewTask(title: string, deskId: number) {
  const task = {
    title,
    description: '',
    checked: false,
    column: deskId,
  };

  return httpClient.post('cards', task).then((response) => response.data);
}

export async function updateTask(
  id: number,
  body: {title?: string; description?: string; checked?: boolean},
) {
  return httpClient.put(`cards/${id}`, body).then((response) => response.data);
}

export async function deleteTask(id: number) {
  return httpClient.delete(`cards/${id}`);
}

export async function updateDeskTitle(id: number, title: string) {
  return httpClient
    .put(`columns/${id}`, {title})
    .then((response) => response.data);
}

export async function deleteDesk(id: number) {
  return httpClient.delete(`columns/${id}`);
}

export async function fetchComments() {
  return httpClient.get('comments');
}

export async function addComment(text: string, id: number) {
  return httpClient.post(`cards/${id}/comments`, {body: text});
}

export async function updateComment(text: string, id: number) {
  return httpClient.put(`comments/${id}`, {body: text});
}

export async function deleteComment(id: number) {
  return httpClient.delete(`comments/${id}`);
}
