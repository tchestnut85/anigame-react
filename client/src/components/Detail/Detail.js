import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import { getYear } from '../../utils/helpers';
import { options } from '../../constants/detailsOptions';
import styles from './Detail.module.css';

export const Detail = () => {
  const detailId = useSelector(state => state?.game.detailId);

  const { image, name, release_date, genres, description } = useSelector(
    state => state.game.games.find(game => game.id === detailId)
  );
  const history = useHistory();

  if (!detailId) {
    history.push('/anigame-react');
  }

  return (
    <>
      {!!detailId && (
        <div className={`${styles.details} columns column is-10`}>
          <div id="detail-img" className="column is-one-third">
            <img src={image?.original} alt={name} />
          </div>
          <div id="detail-info" className={`column is-two-thirds`}>
            <h3 className={styles.title}>{name}</h3>
            <div className="columns">
              <p className="column subtitle is-6 has-text-right">
                <b>Released:</b> {getYear(release_date)}
              </p>
              <p className="column subtitle is-6 has-text-left">
                <b>Genre:</b> {genres[0].name}
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
