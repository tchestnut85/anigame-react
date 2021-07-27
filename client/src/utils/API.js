const getGameData = title => {
	return fetch(
		`${process.env.REACT_APP_CORS_PROXY}/http://www.gamespot.com/api/games/?api_key=${process.env.REACT_APP_GAMESPOT_KEY}&filter=name:${title}&format=json&limit=6&sort=release_date:asc`
	);
};

const getGameScore = title => {
	return fetch(
		`${process.env.REACT_APP_CORS_PROXY}/http://www.gamespot.com/api/reviews/?api_key=${process.env.REACT_APP_GAMESPOT_KEY}&filter=title:${title}&format=json`
	);
};

const getAnimeData = title => {
	return fetch(
		`https://kitsu.io/api/edge/anime?filter[text]=${title}&sort=-startDate`
	);
};

export { getGameData, getGameScore, getAnimeData };
