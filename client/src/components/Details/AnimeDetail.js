import React from 'react';
import { useSelector } from 'react-redux';

import { getYear } from '../../utils/helpers';
import { useScroll } from '../../hooks/useScroll';

import styles from './Detail.module.scss';

export const AnimeDetail = () => {
  const animeDetailId = useSelector(state => state?.anime.detailId);
  const anime = useSelector(state =>
    state.anime.animeTitles.find(title => title.id === animeDetailId)
  );

  const {
    canonicalTitle,
    coverImage,
    posterImage,
    createdAt,
    ageRating,
    description,
  } = anime?.attributes || {};

  useScroll();

  return (
    <>
      {anime && (
        <div className={`${styles.details} columns column is-10`}>
          <div id="detail-info" className={`column`}>
            <h3 className={styles.title}>{canonicalTitle}</h3>
            <div id="detail-img" className={styles.animeImage}>
              <img
                src={coverImage?.original || posterImage?.small}
                alt={canonicalTitle}
              />
            </div>
            <div className="columns">
              <p className="column subtitle is-6 is-centered has-text-centered">
                <b>Released:</b> {getYear(createdAt)}
              </p>
              <p className="column subtitle is-6 has-text-centered">
                <b>Rating:</b> {ageRating}
              </p>
            </div>
            <div className="columns">
              <p className="column is-centered">{description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
