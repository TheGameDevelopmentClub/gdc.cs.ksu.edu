import { environment } from 'src/environments/environment';

export const API_PATH = {
  authBaseUrl: `${environment.API_URL}/auth`,
  authCASBaseUrl: `${environment.API_URL}/auth/cas`,
  officersBaseUrl: `${environment.API_URL}/officers`,
  usersBaseUrl: `${environment.API_URL}/users`,
  groupsBaseUrl: `${environment.API_URL}/groups`,
  gamesBaseUrl: `${environment.API_URL}/portfolio/games`
};
