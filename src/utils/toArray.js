function toArray(input) {
  if (!Array.isArray(input)) {
    input = [input];
  }

  return input;
}

export default toArray;
