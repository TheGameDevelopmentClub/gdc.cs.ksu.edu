import { env } from './private';

export const environment = {
  production: true,
  APP_URL: 'https://gdc.cs.ksu.edu',
  API_URL: 'https://ksu-gdc-api.azurewebsites.net',
  apiTokenReq_Domain: env.apiTokenReq_Domain,
  apiTokenReq_ClientId: env.apiTokenReq_ClientId,
  apiTokenReq_ClientSecret: env.apiTokenReq_ClientSecret,
  apiTokenReq_Audience: env.apiTokenReq_Audience
};
