import {
	renderScore,
	reviewTypes,
	starCountArr,
} from '../../utils/renderScore';

import React from 'react';

export const ReviewStars = ({ rawScore }) => {
	const score = renderScore(reviewTypes.game, rawScore);

	return (
		<div id='game-stars' className='container has-text-centered'>
			<h3 className='title has-text-centered is-size-3'>
				{starCountArr.map((star, i) => (
					<i
						key={i}
						className={
							star <= score ? 'fas fa-star' : 'far fa-star'
						}
						aria-hidden='true'
					></i>
				))}
			</h3>
		</div>
	);
};
