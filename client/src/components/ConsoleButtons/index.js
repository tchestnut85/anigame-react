import { ConsoleBtn } from './ConsoleBtn';
import React from 'react';

// TODO - setup the theme color context to change the background and font colors based on the console button clicked

const consoles = [
	{ name: 'playstation', color: 'link' },
	{ name: 'xbox', color: 'success' },
	{ name: 'nintendo-switch', color: 'danger' },
	{ name: 'steam', color: 'light' },
];

export const ConsoleButtons = () => {
	return (
		<div>
			<section className='section pb-6 mb-6'>
				<div className='has-text-centered'>
					<h1 id='console-wars' className='pb-4'>
						Console Wars
					</h1>
					<h2 className='pb-4'>Choose Your Console's Theme!</h2>
				</div>
				<div className='container'>
					<div className='columns'>
						{consoles.map(console => (
							<ConsoleBtn
								console={`${console.name}`}
								color={`${console.color}`}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};
