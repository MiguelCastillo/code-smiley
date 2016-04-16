function toTokenFriendlyName(token) {
  return token
    .replace(/([A-Z]+)/g, (i) => " " + i.toLowerCase())
    .trim();
}

export default toTokenFriendlyName;
