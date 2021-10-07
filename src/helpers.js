export function httpHeader() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('__token'));
}

export const termAndConditions =
  'The names, the urls and the images you upload on devportfolios.net are stored in a' +
  ' database, they are visible and downloadable by anyone through the site and the APIs,' +
  ' devportfolios.net and his author assumes no responsibility for how this data will be' +
  ' used by third parties. If you find the site uploaded to devportfolio.net and want to' +
  ' remove it, simply contact the author and he will do it.';
