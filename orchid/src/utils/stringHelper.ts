export const isHex = (str: string) => {
  var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  return checkForHexRegExp.test(str);
};

export const getIdFromUrl = (url: string) => {
  if (!url) {
    return "";
  }
  const hexStr = url.slice(-24);
  if (!isHex(hexStr)) {
    return "";
  }
  return hexStr;
};
