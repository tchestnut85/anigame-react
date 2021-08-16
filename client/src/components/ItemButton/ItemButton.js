import React from 'react';
import { capitalizeWords } from '../../utils/helpers';

export const ItemButton = ({ classes, item, handleSearch }) => {
	return (
		<button className={classes} onClick={handleSearch}>
			{capitalizeWords(item)}
		</button>
	);
};
