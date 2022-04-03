const getAnimeData = title => {
  return fetch(`https://kitsu.io/api/edge/anime?filter[text]=${title}`);
};

const getAnimeStreamUrl = animeId => {
  return fetch(`https://kitsu.io/api/edge/anime/${animeId}/streaming-links`);
};

export { getAnimeData, getAnimeStreamUrl };
