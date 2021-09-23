import React from 'react';
import { getYear } from '../../utils/helpers';
import styles from './Detail.module.css';
import { useHistory } from 'react-router';
import { useSearchContext } from '../../utils/context/SearchState';

export const Detail = () => {
	const history = useHistory();
	const [state] = useSearchContext();
	console.log(state);
	const { query, details } = state;
	console.log('query:', query);
	console.log('details:', details);

	// if (!details) {
	// 	history.push('/anigame-react');
	// }

	return (
		<div className={`${styles.details} columns column is-10`}>
			<div id='detail-img' className='column is-one-third'>
				<img src={details?.image?.original} alt={details?.name} />
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
					<p className='column is-centered'>{details.description}</p>
				</div>
			</div>
		</div>
	);
};
