import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import { getYear } from '../../utils/helpers';

import styles from './Detail.module.css';

export const AnimeDetails = () => {
  const history = useHistory();

  const animeDetailId = useSelector(state => state?.anime.detailId);
  const gameDetailId = useSelector(state => state?.game.detailId);
  const anime = useSelector(state =>
    state.anime.animeTitles.find(title => title.id === animeDetailId)
  );

  if (!animeDetailId && gameDetailId === null) {
    history.push('/anigame-react');
  }

  return (
    <>
      {anime && (
        <div className={`${styles.details} columns column is-10`}>
          <div id="detail-info" className={`column`}>
            <h3 className={styles.title}>
              {anime?.attributes?.canonicalTitle}
            </h3>
            <div id="detail-img">
              <img
                src={anime?.attributes?.coverImage?.original}
                alt={anime?.attributes?.canonicalTitle}
              />
            </div>
            <div className="columns">
              <p className="column subtitle is-6 is-centered has-text-centered">
                <b>Released:</b> {getYear(anime?.attributes?.createdAt)}
              </p>
              <p className="column subtitle is-6 has-text-centered">
                <b>Rating:</b> {anime?.attributes?.ageRating}
              </p>
            </div>
            <div className="columns">
              <p className="column is-centered">
                {anime?.attributes?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
