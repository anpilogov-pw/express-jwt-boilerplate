export const RATE_LIMITES = {
  LOGIN: {
    endpoint: 'login',
    rate_limit: {
      time: 60,
      limit: 5,
    },
  },
  REGISTER: {
    endpoint: 'register',
    rate_limit: {
      time: 60,
      limit: 5,
    },
  },
};
