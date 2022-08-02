const PERMISSIONS = {
  admin: "Admin",
  user: "User",
};

const USER_STATUS = {
  active: 1,
  inactive: 0,
};

const SESSION_EXPIRE_HOUR = 3600000;

module.exports = { PERMISSIONS, USER_STATUS, SESSION_EXPIRE_HOUR };
