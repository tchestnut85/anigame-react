import { AnimeResults } from '../components/AnimeResults';
import { ConsoleButtons } from '../components/ConsoleButtons';
import { Footer } from '../components/Footer';
import { GameResults } from '../components/GameResults';
import { Hero } from '../components/Hero';
import React from 'react';

export const Main = () => {
	return (
		<div className='main-content'>
			<Hero />
			<ConsoleButtons />
			<section className='section'>
				<div>
					<GameResults />
					<AnimeResults />
				</div>
			</section>
			<Footer />
		</div>
	);
};
