function log(type, message) {
  console.log(
    `[${type}] ${message}`
  );
}

function error(message) {
  log('error', message);
}

function info(message) {
  log('info', message);
}

function success(message) {
  log('success', message);
}

module.exports = {
  error, info, success
};
