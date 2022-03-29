import { capitalizeWords, formatDate } from '../../utils/helpers';

import { Link } from 'react-router-dom';
import React from 'react';
import { ReviewStars } from '../ReviewStars/ReviewStars';
import { options } from '../../constants/detailsOptions';
import { replaceSpaces } from '../../utils/helpers';
import { reviewTypes } from '../../utils/renderScore';
import { setDetails } from '../../utils/context/searchActions';
import styles from './GameResults.module.css';
import { useSearchContext } from '../../utils/context/SearchState';

export const GameResults = () => {
  const [state, dispatch] = useSearchContext();
  const { gameState: games, query, gameScore } = state;

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
            {games.map(game => (
              <div
                key={game.id}
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
                      src={game.image.original}
                      className={styles.image}
                      alt={`Cover Art for ${game.name}`}
                    />
                  </div>
                  <div id="game-header" className="column has-text-centered">
                    <Link
                      to={`/anigame-react/${replaceSpaces(query)}`}
                      onClick={() => setDetails(options.game, game, dispatch)}
                    >
                      <h3>{game.name}</h3>
                    </Link>
                    <div
                      id="game-stars"
                      className="container has-text-centered"
                    >
                      <h4 className="title has-text-centered is-size-3">
                        <ReviewStars
                          reviewType={reviewTypes.game}
                          rawScore={gameScore}
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
                    <p>Release date: {formatDate(game.release_date)}</p>
                    <p>
                      <a
                        href={game.site_detail_url}
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
