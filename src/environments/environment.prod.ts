export const environment = {
  production: true,
  token_auth_config: {
    apiBase: "https://tedi-api.quantifys.com",
    signInRedirect: "login",
    signOutFailedValidate: true
  },
  VERSION: require('../../package.json').version
};
