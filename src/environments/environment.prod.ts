export const environment = {
  production: true,
  token_auth_config: {
    apiBase: "https://api.gemeniindia.com",
    signInRedirect: "login",
    signOutFailedValidate: false
  },
  VERSION: require('../../package.json').version
};
