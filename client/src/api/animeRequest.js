import axios from 'axios';

const KITSU_URL = 'https://kitsu.io/api/edge';

const animeRequest = axios.create({
  baseURL: KITSU_URL,
  method: 'GET',
});

export const fetchAnimeData = title => {
  return animeRequest({
    url: '/anime',
    params: {
      'filter[text]': title,
    },
  });
};

export const fetchAnimeStreamUrl = id => {
  return animeRequest({
    url: `/anime/${id}/streaming-links`,
  });
};
