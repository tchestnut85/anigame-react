import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AlertModal } from '../components/AlertModal/AlertModal';
import { AnimeResults } from '../components/AnimeResults/AnimeResults';
// import { ConsoleButtons } from '../components/ConsoleButtons/ConsoleButtons';
import { GameResults } from '../components/GameResults/GameResults';
import { Loader } from '../components/Loader/Loader';

import { clearGameDetailId } from '../redux/game';
import { clearAnimeDetails, clearAnimeError } from '../redux/anime';

export const Main = () => {
  const { isLoading } = useSelector(state => state.game);
  const { error } = useSelector(state => state.anime);
  const dispatch = useDispatch();

  // clear/reset the detailIds on component mount in case of navigating from single detail view to results list
  useEffect(() => {
    dispatch(clearGameDetailId());
    dispatch(clearAnimeDetails());
  }, [dispatch]);

  return (
    <main className="main-content">
      {/* <ConsoleButtons /> TODO - re-enable later */}
      {isLoading && <Loader />}
      <section className="section">
        <div>
          <GameResults />
          <AnimeResults />
          {error ? (
            <AlertModal
              type={error.type}
              icon={error.icon}
              message={error.message}
              subMessage={error.subMessage}
              onClose={() => dispatch(clearAnimeError())}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
};
