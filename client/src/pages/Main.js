import { AlertModal } from '../components/AlertModal/AlertModal';
import { AnimeResults } from '../components/AnimeResults/AnimeResults';
import { CLEAR_ERROR } from '../utils/context/searchActions';
import { ConsoleButtons } from '../components/ConsoleButtons';
import { Footer } from '../components/Footer';
import { GameResults } from '../components/GameResults';
import { Hero } from '../components/Hero';
import React from 'react';
import { useSearchContext } from '../utils/context/SearchState';

export const Main = () => {
	const [{ error }, dispatch] = useSearchContext();

	const closeModal = () => {
		dispatch({ type: CLEAR_ERROR });
	};

	return (
		<div className='main-content'>
			<Hero />
			<ConsoleButtons />
			<section className='section'>
				<div>
					<GameResults />
					<AnimeResults />
					{error && (
						<AlertModal
							closeModal={closeModal}
							type={error?.type}
							icon={error?.icon}
							message={error?.message}
							subMessage={error?.subMessage}
						/>
					)}
				</div>
			</section>
			<Footer />
		</div>
	);
};
