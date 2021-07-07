const getGameData = title => {
	return fetch(
		`${process.env.REACT_APP_CORS_PROXY}/http://www.gamespot.com/api/games/?api_key=${process.env.REACT_APP_GAMESPOT_KEY}&filter=name:${title}&format=json&limit=6&sort=release_date:asc`
	);
};

export { getGameData };
