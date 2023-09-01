/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

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

function warn(message) {
  log('warn', message);
}

module.exports = {
  error, info, success, warn
};
