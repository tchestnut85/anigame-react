const renderScore = (type, rawScore) => {
	switch (type) {
		case reviewTypes.game:
			return Math.round(rawScore / 2);
		case reviewTypes.anime:
			return Math.round(rawScore / 20);
		default:
			return null;
	}
};

const reviewTypes = {
	game: 'game',
	anime: 'anime',
};

const starCountArr = [1, 2, 3, 4, 5];

export { renderScore, reviewTypes, starCountArr };
