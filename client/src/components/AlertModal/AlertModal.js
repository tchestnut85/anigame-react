import React from 'react';

export const AlertModal = ({
	type,
	icon,
	message,
	subMessage = '',
	closeModal,
}) => {
	return (
		<div
			id={type}
			className='modal is-active is-clipped has-text-centered has-background-grey-lighter'
		>
			<div id={`${type}-bg`} className='modal-background'></div>
			<div className='modal-card'>
				<header className='modal-card-head has-background-grey-lighter'>
					<p className='modal-card-title has-text-black-bis'>
						{message}
					</p>
					<button
						id={`${type}-btn`}
						className='delete'
						aria-label='close'
						onClick={closeModal}
					></button>
				</header>
				<i
					className={`${icon} fa-5x has-text-black-bis has-background-grey-lighter`}
				></i>
				<section
					id={`${type}-text`}
					className='modal-card-body has-text-black-bis has-background-grey-lighter'
				>
					<p>{subMessage}</p>
				</section>
				<footer className='modal-card-foot has-background-grey-lighter'></footer>
			</div>
		</div>
	);
};
