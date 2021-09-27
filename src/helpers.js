export function httpHeader() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('__token'));
}
