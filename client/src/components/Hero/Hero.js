import React from 'react';

export const Hero = () => {
	return (
		<section
			id='hero'
			className='hero is-dark is-bold is-small project-title'
		>
			<div className='columns hero-body mt-6'>
				<div className='column is-one-fifth has-text-centered'>
					<i className='is-white fas fa-gamepad fa-5x'></i>
				</div>
				<div className='hero-container column container has-text-left'>
					<h1 className='title app-title'>AniGame</h1>
					<br />
					<h2 className='subtitle app-description'>
						Search for your favorite video games to find related
						Anime!
					</h2>
				</div>
			</div>
		</section>
	);
};
