import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReviewStars } from '../ReviewStars/ReviewStars';

import { capitalizeWords, replaceSpaces } from '../../utils/helpers';
import { reviewTypes } from '../../utils/renderScore';
import { getAnimeData, getAnimeStreamUrls } from '../../redux/anime';

import { setAnimeDetails } from '../../redux/anime';

export const AnimeResults = () => {
  const dispatch = useDispatch();
  const query = useSelector(state => state.query);
  const { games } = useSelector(state => state.game);
  const { animeTitles, streamUrls, loading } = useSelector(
    state => state.anime
  );

  // search for the anime based on the query, fetching from the Kitsu API
  const animeSearch = async () => {
    try {
      dispatch(getAnimeData(query));
    } catch (err) {
      console.error(err);
    }
  };

  // search for each anime's streaming service URL using its ID
  const searchForStreamUrl = async animeId => {
    try {
      dispatch(getAnimeStreamUrls(animeId));
    } catch (err) {
      console.error(err);
    }
  };

  // run the animeSearch function when games is populated/exists after initial game search
  useEffect(() => {
    if (games.length) animeSearch();
  }, [games]); // eslint-disable-line react-hooks/exhaustive-deps

  // run the searchForStreamUrl when the anime search is done and loading changes
  useEffect(() => {
    searchForStreamUrl(animeTitles.map(title => title.id));
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  // function to get the matching stream url for the anime by ID
  const findStreamUrl = animeId => {
    const foundUrl = streamUrls?.find(url => url.id === animeId);
    return foundUrl?.url;
  };

  // flag to determine if there is a stream url for the anime
  const hasStreamUrl = animeId => {
    return findStreamUrl(animeId) ? true : false;
  };

  const handleSetAnimeDetails = id => {
    dispatch(setAnimeDetails(id));
  };

  return (
    <>
      {animeTitles.length ? (
        <div id="anime-container">
          <p id="anime-results">Anime found for {capitalizeWords(query)}:</p>
          <div
            id="results-container"
            className="columns is-multiline is-centered is-vcentered is-2 mt-4"
          >
            {animeTitles.map(anime => {
              return (
                <div
                  key={`anime-result-${anime.id}`}
                  id={`${anime.attributes.canonicalTitle}-container`}
                  className="column anime-class anime-content search-results-anime is-two-fifths has-text-centered mx-3 my-4"
                >
                  <div
                    className="container has-text-centered is-size-5"
                    id={`${anime.attributes.canonicalTitle}-info`}
                  >
                    <Link
                      to={`/anigame-react/${replaceSpaces(
                        anime.attributes.canonicalTitle
                      )}`}
                      onClick={() => handleSetAnimeDetails(anime.id)}
                    >
                      <h3
                        className="title has-text-centered is-size-3"
                        id={`${anime.attributes.canonicalTitle}-title`}
                      >
                        {anime.attributes.canonicalTitle}
                      </h3>
                    </Link>
                  </div>
                  <div
                    className="container is-centered"
                    id={`${anime.attributes.canonicalTitle}-vid-container`}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${anime.attributes.youtubeVideoId}?controls=1?controls=1`}
                      frameBorder="0"
                      allowFullScreen
                      alt={`Trailer for ${anime.attributes.canonicalTitle}`}
                      title={`Trailer for ${anime.attributes.canonicalTitle}`}
                      id={`${anime.attributes.canonicalTitle}-video`}
                    ></iframe>
                  </div>
                  <div className="anime-rating-stream-div columns is-vcentered container has-text-centered">
                    <span
                      id={`${anime.attributes.canonicalTitle}-rating`}
                      className="column container has-text-right is-size-4"
                    >
                      <ReviewStars
                        reviewType={reviewTypes.anime}
                        rawScore={anime.attributes.averageRating}
                      />
                    </span>

                    {hasStreamUrl(anime.id) ? (
                      <div
                        id={`anime-stream-${anime.id}`}
                        className="anime-stream column is-size-5 anime-stream-style"
                      >
                        <a
                          href={findStreamUrl(anime.id)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Watch {anime.attributes.canonicalTitle} the Animation
                          here!
                        </a>
                      </div>
                    ) : (
                      <div className="anime-stream column is-size-5 anime-stream-style">
                        Sorry, no streaming info is available for this title.
                      </div>
                    )}
                  </div>
                  <p
                    id="anime-description"
                    className="container has-text-left is-size-6"
                  >
                    {/* TODO - make a seperate description component using react-router for this... or maybe a modal 
											{anime.attributes.description} 
										*/}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};
