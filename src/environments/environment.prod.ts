export const environment = {
  production: true,
  token_auth_config: {
    apiBase: "https://api.pianvtsirnss.com",
    signInRedirect: "login",
    signOutFailedValidate: true,
  },
  VERSION: require("../../package.json").version,
};
