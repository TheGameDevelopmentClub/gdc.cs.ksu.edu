import { env } from './private';

export const environment = {
  production: false,
  APP_URL: 'http://localhost:4200',
  API_URL: 'http://localhost:5000',
  apiTokenReq_Domain: env.apiTokenReq_Domain,
  apiTokenReq_ClientId: env.apiTokenReq_ClientId,
  apiTokenReq_ClientSecret: env.apiTokenReq_ClientSecret,
  apiTokenReq_Audience: env.apiTokenReq_Audience
};
