function log(type, message) {
  console.log(
    `[${type}] ${message}`
  );
}

function error(message) {
  log('error', message);
}

module.exports = {
  error
};
