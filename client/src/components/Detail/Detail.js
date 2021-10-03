import React from 'react';
import { getYear } from '../../utils/helpers';
import { options } from '../../constants/detailsOptions';
import styles from './Detail.module.css';
import { useHistory } from 'react-router';
import { useSearchContext } from '../../utils/context/SearchState';

export const Detail = () => {
	const [state] = useSearchContext();
	const { details } = state;
	const history = useHistory();

	const isGame = details?.type === options.game;

	if (!details) {
		history.push('/anigame-react');
	}

	return (
		<>
			{isGame && details ? (
				<div className={`${styles.details} columns column is-10`}>
					<div id='detail-img' className='column is-one-third'>
						<img
							src={details?.image?.original}
							alt={details?.name}
						/>
					</div>
					<div id='detail-info' className={`column is-two-thirds`}>
						<h3 className={styles.title}>{details?.name}</h3>
						<div className='columns'>
							<p className='column subtitle is-6 has-text-right'>
								Released: {getYear(details?.release_date)}
							</p>
							<p className='column subtitle is-6 has-text-left'>
								Genre: {details?.genres[0].name}
							</p>
						</div>
						<div className='columns'>
							<p className='column is-centered'>
								{details?.description}
							</p>
						</div>
					</div>
				</div>
			) : (
				<>
					{details && (
						<div
							className={`${styles.details} columns column is-10`}
						>
							<div id='detail-info' className={`column`}>
								<h3 className={styles.title}>
									{details?.attributes?.canonicalTitle}
								</h3>
								<div id='detail-img'>
									<img
										src={
											details?.attributes?.coverImage
												?.original
										}
										alt={
											details?.attributes?.canonicalTitle
										}
									/>
								</div>
								<div className='columns'>
									<p className='column subtitle is-6 is-centered has-text-centered'>
										<b>Released:</b>{' '}
										{getYear(
											details?.attributes?.createdAt
										)}
									</p>
									<p className='column subtitle is-6 has-text-centered'>
										<b>Rating:</b>{' '}
										{details?.attributes?.ageRating}
									</p>
								</div>
								<div className='columns'>
									<p className='column is-centered'>
										{details?.attributes?.description}
									</p>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};
