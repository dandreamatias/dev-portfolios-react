import { env } from './environments/env';

export class HTTP {
  constructor() {}

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
        type: 'GET',
        headers: this.header(),
        ...options,
      });
      const data = await res.json();
      return data;
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
