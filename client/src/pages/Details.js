import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { GameDetail } from '../components/Details/GameDetail';
import { AnimeDetail } from '../components/Details/AnimeDetail';

import { clearGameDetailId } from '../redux/game';
import { clearAnimeDetails } from '../redux/anime';
import { ROUTES } from '../constants';

import styles from '../App.module.scss';

export const Details = () => {
  const dispatch = useDispatch();
  const gameId = useSelector(state => state.game.detailId);
  const animeId = useSelector(state => state.anime.detailId);

  const noData = !gameId && !animeId;

  const DetailComp = gameId ? GameDetail : AnimeDetail;

  return (
    <section
      className={`${styles.container} columns section is-vcentered ${
        noData ? '' : 'is-centered'
      }`}
    >
      {noData ? (
        <>
          <h2 className={styles.heading}>
            No search results, redirecting to homepage.
          </h2>
          <Redirect to={ROUTES.home} />
        </>
      ) : (
        <>
          <DetailComp />
          <Link
            className="button is-dark"
            to={ROUTES.home}
            onClick={() =>
              dispatch(gameId ? clearGameDetailId() : clearAnimeDetails())
            }
          >
            Back to Results
          </Link>
        </>
      )}
    </section>
  );
};
