const storage = window.localStorage;

export const TOKEN_KEY = "auth-token";

export const setToken = (value: string) => {
  storage.setItem(TOKEN_KEY, value);
};

export const getToken = () => {
  const token = storage.getItem(TOKEN_KEY);
  return token;
};

export const removeToken = () => {
  storage.removeItem(TOKEN_KEY);
};
