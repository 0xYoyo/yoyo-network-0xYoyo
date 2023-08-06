import moment from "moment";

const setLocalStorage = (responseObj) => {
  const [duration, unit] = responseObj.expiresIn.split(" ");
  const expires = moment().add(duration, unit);
  localStorage.setItem("jwt_token", responseObj.token);
  localStorage.setItem("expires_at", JSON.stringify(expires.valueOf()));
};

const logout = () => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("expires_at");
};

const isLoggedIn = () => {
  return moment().isBefore(getExpiration());
};

const getExpiration = () => {
  const expiration = localStorage.getItem("expires_at");
  if (expiration) {
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  } else {
    return moment();
  }
};

export { setLocalStorage, logout, isLoggedIn, getExpiration };
