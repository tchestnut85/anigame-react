import React from 'react';
import { useSelector } from 'react-redux';

import { AlertModal } from '../components/AlertModal/AlertModal';
import { AnimeResults } from '../components/AnimeResults/AnimeResults';
import { ConsoleButtons } from '../components/ConsoleButtons/ConsoleButtons';
import { GameResults } from '../components/GameResults/GameResults';
import { Loader } from '../components/Loader/Loader';

export const Main = () => {
  const { isLoading } = useSelector(state => state.game);
  const { error } = useSelector(state => state.anime);

  return (
    <main className="main-content">
      <ConsoleButtons />
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
            />
          ) : null}
        </div>
      </section>
    </main>
  );
};
