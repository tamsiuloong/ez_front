import fetch from 'utils/fetch';

export function loginByEmail(username, password) {
  const data = {
    username,
    password,
    "grant_type": "password"
  };
  return fetch({
    url: '/oauth/token',
    method: 'POST',
    params:data,
    auth: {
      username: 'jk_front',
      password: '123456'
    }
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo() {
  return fetch({
    url: '/user/info',
    method: 'get'
  });
}

