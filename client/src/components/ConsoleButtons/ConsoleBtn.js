import React from 'react';

export const ConsoleBtn = ({ console, color }) => {
	return (
		<div className='column'>
			<button
				id={console}
				className={`button is-large is-${color} is-fullwidth ${console}-button`}
			>
				<span className='icon'>
					<div className='iconify' data-icon={`cib:${console}`}></div>
				</span>
			</button>
		</div>
	);
};
