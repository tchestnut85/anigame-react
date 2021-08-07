import { renderScore, starCountArr } from '../../utils/renderScore';

import React from 'react';

export const ReviewStars = ({ reviewType, rawScore }) => {
	const score = renderScore(reviewType, rawScore);

	return (
		<>
			{score
				? starCountArr.map((star, i) => (
						<i
							key={i}
							className={
								star <= score ? 'fas fa-star' : 'far fa-star'
							}
							aria-hidden='true'
						></i>
				  ))
				: starCountArr.map((star, i) => (
						<i key={i} className='far fa-question-circle'></i>
				  ))}
		</>
	);
};
