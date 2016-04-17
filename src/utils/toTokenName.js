function toTokenName(token) {
  return token
    .replace(/([A-Z]+)/g, (i) => " " + i.toLowerCase())
    .trim();
}

export default toTokenName;
