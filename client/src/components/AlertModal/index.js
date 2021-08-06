import React from 'react';

// TODO - enable modals to show on search errors

// Anime alert props => anime-alert, fas fa-sad-cry fa-5x, No Anime Found...
// Empty search alert => empty-search, far fa-frown-open fa-5x, You didn't search for anything..., Try typing a video game title in the search bar.

export const AlertModal = ({ type, icon, message1, message2 = '' }) => {
	return (
		<div
			id={type}
			className='modal is-clipped has-text-centered has-background-grey-lighter'
		>
			<div id={`${type}-bg`} className='modal-background'></div>
			<div className='modal-card'>
				<header className='modal-card-head has-background-grey-lighter'>
					<p className='modal-card-title has-text-black-bis'>
						{message1}
					</p>
					<button
						id={`${type}-btn`}
						className='delete'
						ariaLabel='close'
					></button>
				</header>
				<i
					className={`${icon} fa-5x has-text-black-bis has-background-grey-lighter`}
				></i>
				<section
					id={`${type}-text`}
					className='modal-card-body has-text-black-bis has-background-grey-lighter'
				>
					<p>{message2}</p>
				</section>
				<footer className='modal-card-foot has-background-grey-lighter'></footer>
			</div>
		</div>
	);
};
