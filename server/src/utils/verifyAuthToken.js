const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_KEY;

const verifyAuthToken = (bearerToken) => {
  return new Promise((resolve, reject) => {
    if (!bearerToken) {
      throw new Error("AUTH_ERROR");
    }
    jwt.verify(bearerToken, privateKey, (err, decoded) => {
      if (err) {
        console.log('error in decoding', err)
        reject(err)
      }
      console.log('this is decoded token', decoded)
      resolve(decoded);
    });
  });
}

module.exports = verifyAuthToken;
