//Auth0 ids for the stage application
export class auth0Vars {
  static AUTH0_CLIENT_ID = "qqPbXcx5iJnVfaeT32UgH_QXhqlS5R-f";
  static AUTH0_DOMAIN = "capfi-objectif.eu.auth0.com";
  static CALLBACK_URL = 'https://capfi-objectif.eu.auth0.com/mobile';
  static TEST_CALLBACK_URL = 'file:///android_asset/www/index.html';
  static BROWSER_CALLBACK_URL = location.href;
}

export const optionsLock = {
    auth: {
      redirect: true,
      responseType: 'token',
      params: {
        scope: 'openid profile offline_access',
        device: 'my-device'
      },
      sso: false
    }, 
    closable : false 
}
