import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { GameDetail } from '../components/Details/GameDetail';
import { AnimeDetail } from '../components/Details/AnimeDetail';

import { clearGameDetailId } from '../redux/game';
import { clearAnimeDetails } from '../redux/anime';

import styles from '../styles/App.module.css';

export const Details = () => {
  const dispatch = useDispatch();
  const gameId = useSelector(state => state.game.detailId);

  const DetailComp = gameId ? GameDetail : AnimeDetail;

  return (
    <section
      className={`${styles.container} columns section is-centered is-vcentered`}
    >
      <DetailComp />
      <Link
        className="button is-dark"
        to={'/anigame-react'}
        onClick={() =>
          dispatch(gameId ? clearGameDetailId() : clearAnimeDetails())
        }
      >
        Back to Results
      </Link>
    </section>
  );
};
