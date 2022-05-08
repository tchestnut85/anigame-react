import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReviewStars } from '../ReviewStars/ReviewStars';

import { replaceSpaces } from '../../utils/helpers';
import { reviewTypes } from '../../utils/renderScore';
import { capitalizeWords, formatDate } from '../../utils/helpers';
import { setGameDetails } from '../../redux/game';

import styles from './GameResults.module.scss';

export const GameResults = () => {
  const dispatch = useDispatch();
  const query = useSelector(state => state.query);
  const { games, score } = useSelector(state => state.game);

  const handleSetGameDetails = id => {
    dispatch(setGameDetails(id));
  };

  return (
    <>
      {games.length ? (
        <div>
          <p className={styles.results}>
            Games found for {capitalizeWords(query)}:
          </p>
          <div
            id="game-columns-container"
            className="columns is-multiline is-centered is-vcentered is-2 mt-4"
          >
            {games.map(({ id, name, image, release_date, site_detail_url }) => (
              <div
                key={id}
                id="game-column"
                data-name={query}
                className={`column ${styles.searchResults} is-two-fifths mx-3 my-4`}
              >
                <div
                  id="base-search"
                  className={`columns is-vcentered ${styles.content}`}
                >
                  <div
                    id="column-image"
                    className={`${styles.imgColumn} column is-one-fith is-narrow`}
                  >
                    <img
                      id="game-image"
                      src={image?.original}
                      className={styles.image}
                      alt={`Cover Art for ${name}`}
                    />
                  </div>
                  <div id="game-header" className="column has-text-centered">
                    <Link
                      to={`/anigame-react/${replaceSpaces(query)}`}
                      onClick={() => handleSetGameDetails(id)}
                    >
                      <h3>{name}</h3>
                    </Link>
                    <div
                      id="game-stars"
                      className="container has-text-centered"
                    >
                      <h4 className="title has-text-centered is-size-3">
                        <ReviewStars
                          reviewType={reviewTypes.game}
                          rawScore={score}
                        />
                      </h4>
                    </div>
                  </div>
                </div>
                <div id="base-click" className="columns is-mobile">
                  <div
                    id="column-description"
                    className="column has-text-centered"
                  >
                    <p>Release date: {formatDate(release_date)}</p>
                    <p>
                      <a
                        href={site_detail_url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Read More at GameSpot
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
