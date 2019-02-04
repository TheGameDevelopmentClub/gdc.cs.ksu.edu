import { environment } from 'src/environments/environment';

export const API_PATH = {
  auth: `${environment.API_URL}/auth`,
  officers: `${environment.API_URL}/officers`,
  users: `${environment.API_URL}/users`,
  games: `${environment.API_URL}/portfolio/games`
};

export const APP_PATH = {
  home: `/`,
  login: `/login`,
  loginFull: `${environment.APP_URL}/login`,
  logout: `/logout`,
  members: `/members`,
  portfolio: `/portfolio`,
  games: '/portfolio/games',
  manage: `/manage`,
  game_jam: `/game-jam`
};
