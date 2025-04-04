const ROUTES = {
  WITHOUT_AUTH: {
    SIGN_IN: '/sign-in',
    CHANGE_SIGN_IN: '/change-sign-in',
  },

  AUTHENTICATED: {
    HOME: '/home',
    HISTORY: '/history',
    PLAYERS: '/players',
    MATCH_DETAILS: '/match-details',
    MATCH_CREATE: '/match-create',
    ADD_ADMINS: '/add-admins',
  },
};

const KEYS_COOKIES = {
  USER_SESSIONS: 'jumentus_sc_auth_session',
};

const FIREBASE = {
  COLLECTIONS: {
    HAS_PERMISSION: 'hasPermission',
    PLAYERS: 'players',
    MATCHES: 'matches',
  },
};

export { ROUTES, KEYS_COOKIES, FIREBASE };
