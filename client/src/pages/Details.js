import { Detail } from '../components/Detail/Detail';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from '../styles/App.module.css';

export const Details = () => {
  return (
    <section
      className={`${styles.container} columns section is-centered is-vcentered`}
    >
      <Detail />
      <Link className="button is-dark" to={'/anigame-react'}>
        Back to Results
      </Link>
    </section>
  );
};
