import dayjs from 'dayjs';

const capitalizeFirstLetter = string => {
	return `${string[0].toUpperCase()}${string.slice(1)}`;
};

const capitalizeWords = string => {
	return string
		.split(' ')
		.map(word => capitalizeFirstLetter(word))
		.join(' ');
};

const formatDate = date => {
	return dayjs(date).format('MMM DD, YYYY');
};

export { capitalizeFirstLetter, capitalizeWords, formatDate };
