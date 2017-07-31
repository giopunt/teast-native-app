export const search = ({ key, term, type = 'video' }) => fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${term}&type=${type}&maxResults=25`, {
  method: 'GET',
}).then(res => res.json());
