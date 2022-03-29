import { AlertModal } from '../components/AlertModal/AlertModal';
import { AnimeResults } from '../components/AnimeResults/AnimeResults';
import { CLEAR_ERROR } from '../utils/context/searchActions';
import { ConsoleButtons } from '../components/ConsoleButtons/ConsoleButtons';
import { GameResults } from '../components/GameResults/GameResults';
import { Loader } from '../components/Loader/Loader';
import React from 'react';
import { useSearchContext } from '../utils/context/SearchState';

export const Main = () => {
  const [{ error, gameLoading }, dispatch] = useSearchContext();

  const closeModal = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  return (
    <div className="main-content">
      <ConsoleButtons />
      {gameLoading && <Loader />}
      <section className="section">
        <div>
          <GameResults />
          <AnimeResults />
          {error ? (
            <AlertModal
              closeModal={closeModal}
              type={error.type}
              icon={error.icon}
              message={error.message}
              subMessage={error.subMessage}
            />
          ) : null}
        </div>
      </section>
    </div>
  );
};
