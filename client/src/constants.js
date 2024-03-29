export const PROXY = process.env.REACT_APP_CORS_PROXY;

export const STATUSES = {
  OK: 'OK',
  OK_CODE: 200,
};

export const HOME_ROUTE = '/anigame-react';
export const ROUTES = {
  home: HOME_ROUTE,
  title: `${HOME_ROUTE}/:title`,
};

export const CONSOLES = [
  { name: 'playstation', color: 'link' },
  { name: 'xbox', color: 'success' },
  { name: 'nintendo-switch', color: 'danger' },
  { name: 'steam', color: 'light' },
];

export const MESSAGES = {
  errors: {
    empty: 'You must enter something to search for.',
  },
  notFound: 'Page not found, redirecting to homepage.',
};

export const ERRORS = {
  anime: {
    id: 'anime',
    type: 'anime-alert',
    icon: 'fas fa-sad-cry',
    message: 'No Anime found for that game...',
    subMessage: 'Check out the game results or search again.',
  },
};
