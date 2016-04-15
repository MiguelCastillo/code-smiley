function toTokenName(input) {
  return input
    .replace(/\s+/, " ")
    .split(" ")
    .map(capitalize)
    .join('');
}

function capitalize(input) {
  return input.replace(/^\w/, input[0].toUpperCase());
}

export default toTokenName;
