const crypto = require('crypto');
const {v4, v5} = require('uuid');
const {startOfMonth} = require('date-fns');

function secret() {
  return hash(process.env.SECRET || process.env.DATABASE_URL);
}

function salt() {
  const ROTATING_SALT = hash(startOfMonth(new Date()).toUTCString());

  return hash(secret(), ROTATING_SALT);
}

function uuid(...args) {
  if (!args.length) return v4();

  return v5(hash(...args, salt()), v5.DNS);
}

function hash(...args) {
  return crypto.createHash('md5').update(args.join('')).digest('hex');
}

function randomString(){
  return crypto.randomBytes(8).toString("hex");
}

module.exports = {uuid, hash, salt, secret, randomString};
