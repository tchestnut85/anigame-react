import axios from 'axios';

const PROXY = process.env.REACT_APP_CORS_PROXY;
const GAMESPOT_URL = '/http://www.gamespot.com/api';

const gameRequest = axios.create({
  baseURL: `${PROXY}${GAMESPOT_URL}`,
});

export const fetchGameData = title => {
  return gameRequest({
    method: 'get',
    url: '/games/',
    params: {
      api_key: process.env.REACT_APP_GAMESPOT_KEY,
      filter: `name:${title}`,
      format: 'json',
      limit: 6,
      sort: 'release_date:asc',
    },
  });
};
