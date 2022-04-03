import axios from 'axios';

const GAMESPOT_URL = '/http://www.gamespot.com/api';
const proxy = process.env.REACT_APP_CORS_PROXY;
const gamespotApiKey = process.env.REACT_APP_GAMESPOT_KEY;

const gameRequest = axios.create({
  baseURL: `${proxy}${GAMESPOT_URL}`,
  method: 'GET',
});

export const fetchGameData = title => {
  return gameRequest({
    url: '/games/',
    params: {
      filter: `name:${title}`,
      limit: 6,
      sort: 'release_date:desc',
      api_key: gamespotApiKey,
      format: 'json',
    },
  });
};

export const fetchGameScore = title => {
  return gameRequest({
    url: '/reviews/',
    params: {
      filter: `title:${title}`,
      api_key: gamespotApiKey,
      format: 'json',
    },
  });
};
