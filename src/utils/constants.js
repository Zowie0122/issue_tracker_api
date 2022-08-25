const PERMISSIONS = {
  admin: "Admin",
  user: "User",
};

const USER_STATUS = {
  active: 1,
  inactive: 0,
};

const SESSION_EXPIRE_HOUR = 3600000;

const EM_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Minimum eight characters, at least one letter, one number and one special character
const PW_REGEX = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}/;

module.exports = {
  PERMISSIONS,
  USER_STATUS,
  SESSION_EXPIRE_HOUR,
  EM_REGEX,
  PW_REGEX,
};
