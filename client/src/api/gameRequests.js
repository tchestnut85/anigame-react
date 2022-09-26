import axios from 'axios';

import { PROXY } from '../constants';

const GAMESPOT_URL = '/http://www.gamespot.com/api';
const gamespotApiKey = process.env.REACT_APP_GAMESPOT_KEY;

const gameRequest = axios.create({
  baseURL: `${PROXY}${GAMESPOT_URL}`,
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
