import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTES, MESSAGES } from '../constants';

import styles from '../App.module.scss';

export const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    history.push(ROUTES.home);
  }, [history]);

  return (
    <section className={`${styles.container} columns section is-vcentered`}>
      <h2 className={styles.heading}>{MESSAGES.notFound}</h2>
    </section>
  );
};
