import React from 'react';
import { useSelector } from 'react-redux';

import { getYear } from '../../utils/helpers';
import { useScroll } from '../../hooks/useScroll';

import styles from './Detail.module.scss';

export const GameDetail = () => {
  const gameDetailId = useSelector(state => state?.game.detailId);
  const game = useSelector(state =>
    state.game.games.find(game => game.id === gameDetailId)
  );

  useScroll();

  return (
    <>
      {!!gameDetailId && (
        <div className={`${styles.details} columns column is-10`}>
          <div id="detail-img" className="column is-one-third">
            <img src={game?.image?.original} alt={game?.name} />
          </div>
          <div id="detail-info" className={`column is-two-thirds`}>
            <h3 className={styles.title}>{game?.name}</h3>
            <div className="columns">
              <p className="column subtitle is-6 has-text-right">
                <b>Released:</b> {getYear(game?.release_date)}
              </p>
              <p className="column subtitle is-6 has-text-left">
                <b>Genre:</b> {game?.genres[0].name}
              </p>
            </div>
            <div className="columns">
              <p className="column is-centered">{game?.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
