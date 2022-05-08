import React from 'react';
import bulmaImg from '../../assets/images/made-with-bulma.png';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer
      className={`app-footer columns pl-5 pr-5 pt-5 pb-4 has-background-grey-lighter ${styles.container}`}
    >
      <div className="column is-4">
        <div className="footer-info container columns mb-0 has-text-centered">
          <i className="column is-2 fas fa-gamepad fa-3x"></i>
          <h4 className="column has-text-left pl-5">AniGame</h4>
        </div>
        <div className="devs columns">
          <p className="pl-4 is-size-7">
            Developed by{' '}
            <a href="https://tomchestnut.dev" target="_blank" rel="noreferrer">
              Tom Chestnut
            </a>{' '}
            and{' '}
            <a
              href="https://cfsylvester.github.io/clairesylvester.github.io/"
              target="_blank"
              rel="noreferrer"
            >
              Claire Sylvester
            </a>
            .
          </p>
        </div>
      </div>
      <div className="column pr-0 is-6 has-text-right">
        <a
          href="https://github.com/tchestnut85/anigame-react"
          target="_blank"
          rel="noreferrer"
        >
          <i className={`fab fa-github-square fa-4x ${styles.githubIcon}`}></i>
        </a>
      </div>
      <div className="ml-0 column is-2 has-text-centered">
        <div>
          <p
            className="is-size-6"
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://www.gamespot.com/api/"
              target="_blank"
              rel="noreferrer"
            >
              Gamspot API
            </a>

            <a
              href="https://kitsu.docs.apiary.io/#introduction/questions?"
              target="_blank"
              rel="noreferrer"
            >
              Kitsu API
            </a>
          </p>
        </div>
        <div className="has-background-grey-lighter">
          <p>
            <a href="https://bulma.io" target="_blank" rel="noreferrer">
              <img
                src={bulmaImg}
                alt="Made with Bulma"
                width="182"
                height="40"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
