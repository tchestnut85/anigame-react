import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReviewStars } from '../ReviewStars/ReviewStars';

import {
  CLEAR_ERROR,
  CLEAR_STREAM_URL_DATA,
  SET_ERROR,
  SET_STREAM_URL,
} from '../../utils/context/searchActions';
import { capitalizeWords, replaceSpaces } from '../../utils/helpers';
import { getAnimeStreamUrl } from '../../utils/API';
import { modalProps } from '../../constants/modalValues';
import { options } from '../../constants/detailsOptions';
import { reviewTypes } from '../../utils/renderScore';
import { setDetails } from '../../utils/context/searchActions';
import { useSearchContext } from '../../utils/context/SearchState';

import { clearStreamData, getAnimeData } from '../../redux/anime';

export const AnimeResults = () => {
  const dispatch = useDispatch();
  const query = useSelector(state => state.query);
  const { games } = useSelector(state => state.game);
  const { animeTitles } = useSelector(state => state.anime);

  const [state, reactDispatch] = useSearchContext();
  const { animeLoading, animeStreamUrls } = state;

  // TODO - set the error in anime redux if no anime found for the search
  const { anime: animeError } = modalProps;
  const displayError = () => {
    reactDispatch({
      type: SET_ERROR,
      payload: animeError,
    });
    setTimeout(() => {
      reactDispatch({ type: CLEAR_ERROR });
    }, 3000);
  };

  // search for the anime based on the query, fetching from the Kitsu API
  const animeSearch = async () => {
    reactDispatch({ type: CLEAR_STREAM_URL_DATA });
    dispatch(clearStreamData);

    try {
      dispatch(getAnimeData(query));

      const isError = !!animeTitles.length;
      if (isError) {
        displayError();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // search for each anime's streaming service URL using its ID
  const streamUrlSearch = async animeId => {
    try {
      const streamUrlResponse = await getAnimeStreamUrl(animeId);

      if (!streamUrlResponse.ok) {
        throw Error(
          `There was an error: ${streamUrlResponse.statusText} (${streamUrlResponse.status})`
        );
      }

      const streamUrl = await streamUrlResponse.json();

      reactDispatch({
        type: SET_STREAM_URL,
        payload: {
          id: animeId,
          url: streamUrl?.data[0]?.attributes?.url,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // run the animeSearch function when games is populated/exists after initial game search
  useEffect(() => {
    if (games.length) {
      animeSearch();
    }
    //eslint-disable-next-line
  }, [games]);

  // run the streamUrlSearch when the anime search is done and animeLoading changes (state.animeLoading === false)
  useEffect(() => {
    animeTitles.forEach(anime => {
      streamUrlSearch(anime.id);
    });
    //eslint-disable-next-line
  }, [animeLoading]);

  // function to get the matching stream url for the anime by ID
  const findStreamUrl = animeId => {
    const foundUrl = animeStreamUrls.find(url => url.id === animeId);
    return foundUrl?.url;
  };

  // flag to determine if there is a stream url for the anime
  const hasStreamUrl = animeId => {
    return findStreamUrl(animeId) ? true : false;
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
                      onClick={() => setDetails(options.anime, anime, dispatch)}
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
