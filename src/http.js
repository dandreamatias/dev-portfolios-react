import { env } from './environments/env';

export class HTTP {
  static header() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('__token')}`);
    return myHeaders;
  }

  static async get(path, options = {}) {
    try {
      const res = await fetch(`${env.url}${path}`, {
        method: 'GET',
        headers: this.header(),
        ...options,
      });
      if (res.status === 401) {
        return undefined;
      }
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async put(path, body, options = {}) {
    try {
      await fetch(`${env.url}${path}`, {
        method: 'PUT',
        headers: this.header(),
        body: JSON.stringify(body),
        ...options,
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async delete(path, body, options = {}) {
    try {
      await fetch(`${env.url}${path}`, {
        method: 'DELETE',
        headers: this.header(),
        body: JSON.stringify(body),
        ...options,
      });
    } catch (e) {
      console.log(e);
    }
  }

  static async post(path, body, options = {}) {
    try {
      const res = await fetch(`${env.url}${path}`, {
        method: 'POST',
        headers: this.header(),
        body: JSON.stringify(body),
        ...options,
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
