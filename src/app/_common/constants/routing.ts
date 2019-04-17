import { environment } from 'src/environments/environment';

export const API_URLS = {
  auth: `${environment.API_URL}/auth`,
  officers: `${environment.API_URL}/officers`,
  users: `${environment.API_URL}/users`,
  games: `${environment.API_URL}/portfolio/games`
};

export const APP_ROUTE_NAME = {
  login: 'login',
  logout: 'logout',
  home: '',
  members: 'members',
  portfolio: 'portfolio',
  games: 'games',
  manage: 'manage',
  gameJam: 'game-jam'
};

export const APP_ROUTES = {
  login: `/${APP_ROUTE_NAME.login}`,
  logout: `/${APP_ROUTE_NAME.logout}`,
  home: `/${APP_ROUTE_NAME.home}`,
  members: `/${APP_ROUTE_NAME.members}`,
  portfolio: `/${APP_ROUTE_NAME.portfolio}`,
  games: `/${APP_ROUTE_NAME.portfolio}/${APP_ROUTE_NAME.games}`,
  manage: `/${APP_ROUTE_NAME.manage}`,
  gameJam: `/${APP_ROUTE_NAME.gameJam}`
};

export const QUERY_PARAM_KEY_NAMES = {
  redirectUrl: `redirectUrl`
};
