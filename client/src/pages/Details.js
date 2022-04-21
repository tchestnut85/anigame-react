import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';

import { GameDetail } from '../components/Details/GameDetail';

import { clearGameDetailId } from '../redux/game';

import styles from '../styles/App.module.css';

export const Details = () => {
  const dispatch = useDispatch();

  return (
    <section
      className={`${styles.container} columns section is-centered is-vcentered`}
    >
      <GameDetail />
      <Link
        className="button is-dark"
        to={'/anigame-react'}
        onClick={() => dispatch(clearGameDetailId())}
      >
        Back to Results
      </Link>
    </section>
  );
};
