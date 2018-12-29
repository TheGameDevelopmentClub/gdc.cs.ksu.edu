import { env } from './private';

export const environment = {
  production: false,
  APP_URL: 'https://testing.daytonltaylor.me',
  API_URL: 'https://ksu-gdc-api-dev.azurewebsites.net',
  apiTokenReq_Domain: env.apiTokenReq_Domain,
  apiTokenReq_ClientId: env.apiTokenReq_ClientId,
  apiTokenReq_ClientSecret: env.apiTokenReq_ClientSecret,
  apiTokenReq_Audience: env.apiTokenReq_Audience
};
