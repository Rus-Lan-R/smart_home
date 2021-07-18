const { REACT_APP_API_URL: host } = process.env;

export const signUp = () => `${host}/api/auth/signup`;
export const signIn = () => `${host}/api/auth/signin`;
export const signOut = () => `${host}/api/auth/signout`;
export const checkAuth = () => `${host}/api/auth/check`;
