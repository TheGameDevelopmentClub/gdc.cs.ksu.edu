import { environment } from 'src/environments/environment';

export const API_PATH = {
  auth: {
    cas: `${environment.API_URL}/auth/cas`
  },
  officers: `${environment.API_URL}/officers`,
  users: `${environment.API_URL}/users`,
  groups: `${environment.API_URL}/groups`,
  games: `${environment.API_URL}/portfolio/games`
};

export const APP_PATH = {
  home: `/`,
  login: `/login`,
  loginFull: `${environment.APP_URL}/login`,
  logout: `/logout`,
  members: `/members`,
  groups: `/groups`,
  portfolio: `/portfolio`,
  games: '/portfolio/games',
  manage: `/manage`,
  game_jam: `/game-jam`
};
