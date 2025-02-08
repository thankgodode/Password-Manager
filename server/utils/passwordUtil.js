const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const hashPwd = await bcrypt.hash(password, 10);
  return hashPwd;
}

async function comparePassword(password, hashPwd) {
  const match = await bcrypt.compare(password, hashPwd);
  return match;
}

module.exports = { hashPassword, comparePassword };
