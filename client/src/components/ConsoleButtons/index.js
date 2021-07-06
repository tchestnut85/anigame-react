import { ConsoleBtn } from './ConsoleBtn';
import React from 'react';

export const ConsoleButtons = () => {
	return (
		<div>
			<section className='section pb-6 mb-6'>
				<div className='has-text-centered'>
					<h1 id='console-wars' className='pb-4'>
						Console Wars
					</h1>
				</div>
				<div className='container'>
					<div className='columns'>
						<ConsoleBtn console={'playstation'} color={'link'} />
						<ConsoleBtn console={'xbox'} color={'success'} />
					</div>
					<div className='columns'>
						<ConsoleBtn
							console={'nintendo-switch'}
							color={'danger'}
						/>
						<ConsoleBtn console={'steam'} color={'light'} />
					</div>
				</div>
			</section>
		</div>
	);
};
