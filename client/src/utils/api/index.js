const API_URL = process.env.REACT_APP_API_URL;
//const token = localStorage.getItem('access-token');

export default class API {
  constructor(entity = '') {
    this.URL = `${API_URL}api${entity ? '/' + entity : ''}`;
    this.token = token;
    this.tokenRefresh = token;
  }

  setNewToken = (data) => {
    this.token = data;
  };

  clearLocalStorage() {
    localStorage.removeItem('auth');
    localStorage.removeItem('access-token');
    return localStorage.removeItem('refresh-token');
  }

  get = (path = '', isAuth = false, queries = {}) => {
    const headers = {};

    if (isAuth) {
      headers['authorization'] = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';

    return fetch(`${this.URL}/${path}`, {
      method: 'GET',
      headers,
      queries
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data === 'access token expired') {
          this.clearLocalStorage();
          document.location.reload(true);
        } else {
          return res;
        }
      });
  };

  post = (path = '', isAuth = false, body = {}) => {
    const headers = {};

    if (isAuth) {
      headers['authorization'] = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';
    return fetch(`${this.URL}/${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data === 'access token expired') {
          this.clearLocalStorage();
          document.location.reload(true);
        } else {
          return res;
        }
      });
  };

  put = (path = '', isAuth = false, id, body = {}) => {
    const headers = {};

    if (isAuth) {
      headers['authorization'] = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';

    return fetch(`${this.URL}/${path}${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers
    }).then((res) => res.json());
  };

  delete = (path = '', isAuth = false, id) => {
    const headers = {};

    if (isAuth) {
      headers['authorization'] = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';

    return fetch(`${this.URL}/${path}${id}`, {
      method: 'DELETE',
      headers
    }).then((res) => res.json());
  };
}
