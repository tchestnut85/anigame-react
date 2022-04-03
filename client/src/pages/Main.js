import React from 'react';
import { useSelector } from 'react-redux';

import { AlertModal } from '../components/AlertModal/AlertModal';
import { AnimeResults } from '../components/AnimeResults/AnimeResults';
import { CLEAR_ERROR } from '../utils/context/searchActions';
import { ConsoleButtons } from '../components/ConsoleButtons/ConsoleButtons';
import { GameResults } from '../components/GameResults/GameResults';
import { Loader } from '../components/Loader/Loader';
import { useSearchContext } from '../utils/context/SearchState';

export const Main = () => {
  const { isLoading } = useSelector(state => state.game);

  const [{ error }, dispatch] = useSearchContext();

  // TODO - remove this when adding anime redux
  const closeModal = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  return (
    <main className="main-content">
      <ConsoleButtons />
      {isLoading && <Loader />}
      <section className="section">
        <div>
          <GameResults />
          <AnimeResults />
          {error ? ( // TODO - when adding anime redux, make sure the error gets set correctly
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
    </main>
  );
};
