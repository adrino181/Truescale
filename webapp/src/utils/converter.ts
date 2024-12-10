export const isTokenExpired = (token) =>
  Date.now() >=
  JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).exp * 1000;

export const isHex = (str) => {
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  return checkForHexRegExp.test(str);
};

export const getIdFromUrl = (url) => {
  if (!url) {
    return "";
  }
  const hexStr = url.slice("-24");
  if (!isHex(hexStr)) {
    return "";
  }
  return hexStr;
};
