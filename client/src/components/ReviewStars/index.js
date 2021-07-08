import React from 'react';

export const ReviewStars = ({ number }) => {
	const starCount = Math.floor(number / 2);
	const scoreArray = [1, 2, 3, 4, 5];

	return (
		<div id='game-stars' className='container has-text-centered'>
			<h3 className='title has-text-centered is-size-3'>
				{scoreArray.map(score => (
					<i
						key={score}
						className={
							score <= starCount ? 'fas fa-star' : 'far fa-star'
						}
						aria-hidden='true'
					></i>
				))}
			</h3>
		</div>
	);
};
