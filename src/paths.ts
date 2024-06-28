const ROUTES = {
  WITHOUT_AUTH: {
    SIGN_IN: '/sign-in',
  },

  AUTHENTICATED: {
    HOME: '/home',
    HISTORY: '/history',
    PLAYERS: '/players',
    MATCH_DETAILS: '/match-details',
    MATCH_CREATE: '/match-create',
  },
};

const KEYS_COOKIES = {
  USER_SESSIONS: 'jumentus_sc_auth_session',
};

const FIREBASE = {
  COLLECTIONS: {
    PLAYERS: 'players',
    MATCHES: 'matches',
  },
};

export { ROUTES, KEYS_COOKIES, FIREBASE };
