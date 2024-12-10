var jwt = require('jsonwebtoken');
const privateKey = process.env.JWT_KEY;
/**
  @param id
    Its user Id
  @param pid
    Its profile Id
  1) If user is first time then he will only get user token
  2) After completing his profile he will get access token to browse
*/
const generateAuthToken = function (id, pid) {
  return jwt.sign(
    {
      //user id
      _id: id,
      //profile id
      ...(pid ? { _pid: pid } : {})
    },
    privateKey,
    { expiresIn: '1y' }
  );
};

const generateAnalyticsToken = async function (params, secret) {
  let token;
  try {
    token = jwt.sign(params, secret);
  } catch (e) {
    throw new Error(e);
  }
  return token;
}

const decodeAnalyticsToken = async function (token, secret) {
  const isValid = jwt.verify(token, secret);
  if (!isValid) {
    throw new Error("Invalid Token");
  }
  let data;
  try {
    data = jwt.decode(token)
  } catch (e) {
    throw new Error("Error in Token")
  }
  return data;
}


module.exports = { generateAuthToken, generateAnalyticsToken, decodeAnalyticsToken };
