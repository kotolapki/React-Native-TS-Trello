import axios from 'axios';

function getAuthorizationHeader(token: string) {
  return {
    headers: {Authorization: `Bearer ${token}`},
  };
}

export async function addNewUser(
  email: string,
  name: string,
  password: string,
) {
  const user = {
    email,
    name,
    password,
  };

  return axios
    .post('https://trello-purrweb.herokuapp.com/auth/sign-up', user)
    .then((response) => {
      if (response.data.severity === 'ERROR') {
        throw Error(response.data.message);
      }

      return response;
    });
}

export async function signIn(email: string, password: string) {
  const user = {
    email,
    password,
  };

  return axios
    .post('https://trello-purrweb.herokuapp.com/auth/sign-in', user)
    .then((response) => {
      if (response.data.severity === 'ERROR') {
        throw Error(response.data.message);
      }

      return response;
    });
}

export async function addNewDesk(title: string, token: string) {
  const desk = {
    title,
    description: '',
  };

  if (title.length === 0) {
    throw new Error('empty desk title');
  }

  return axios
    .post(
      'https://trello-purrweb.herokuapp.com/columns',
      desk,
      getAuthorizationHeader(token),
    )
    .then((response) => response);
}

export async function fetchDesks(token: string) {
  return axios
    .get<Array<{id: number; title: string; userId: number}>>(
      'https://trello-purrweb.herokuapp.com/columns',
      getAuthorizationHeader(token),
    )
    .then((response) =>
      response.data.map((desk) => {
        return {title: desk.title, id: desk.id};
      }),
    );
}

export async function fetchTasks(token: string) {
  return axios
    .get(
      'https://trello-purrweb.herokuapp.com/cards',
      getAuthorizationHeader(token),
    )
    .then((response) => response.data);
}

export async function addNewTask(token: string, title: string, deskId: number) {
  const task = {
    title,
    description: '',
    checked: false,
    column: deskId,
  };

  return axios
    .post(
      'https://trello-purrweb.herokuapp.com/cards',
      task,
      getAuthorizationHeader(token),
    )
    .then((response) => response.data);
}

export async function updateTask(
  token: string,
  id: number,
  body: {title?: string; description?: string; checked?: boolean},
) {
  return axios
    .put(
      `https://trello-purrweb.herokuapp.com/cards/${id}`,
      body,
      getAuthorizationHeader(token),
    )
    .then((response) => response.data);
}

export async function deleteTask(token: string, id: number) {
  return axios
    .delete(
      `https://trello-purrweb.herokuapp.com/cards/${id}`,
      getAuthorizationHeader(token),
    )
    .then((response) => response);
}

export async function updateDeskTitle(
  token: string,
  id: number,
  title: string,
) {
  return axios
    .put(
      `https://trello-purrweb.herokuapp.com/columns/${id}`,
      {title},
      getAuthorizationHeader(token),
    )
    .then((response) => response.data);
}

export async function deleteDesk(token: string, id: number) {
  return axios
    .delete(
      `https://trello-purrweb.herokuapp.com/columns/${id}`,
      getAuthorizationHeader(token),
    )
    .then((response) => response);
}

export async function fetchComments(token: string) {
  return axios
    .get(
      'https://trello-purrweb.herokuapp.com/comments',
      getAuthorizationHeader(token),
    )
    .then((response) => response);
}

export async function AddComment(token: string, text: string, id: number) {
  return axios
    .post(
      `https://trello-purrweb.herokuapp.com/cards/${id}/comments`,
      {body: text},
      getAuthorizationHeader(token),
    )
    .then((response) => response);
}

export async function updateComment(token: string, text: string, id: number) {
  return axios
    .put(
      `https://trello-purrweb.herokuapp.com/comments/${id}`,
      {body: text},
      getAuthorizationHeader(token),
    )
    .then((response) => response);
}

export async function deleteComment(token: string, id: number) {
  return axios
    .delete(
      `https://trello-purrweb.herokuapp.com/comments/${id}`,
      getAuthorizationHeader(token),
    )
    .then();
}
