/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

const { execSync, spawn } = require('child_process');
const paths = require('./paths');
const { join } = require('path');

module.exports.kill = () => {
  let command, proc;
  if (process.platform === 'win32') {
    command = 'tasklist'; proc = 'Deezer.exe';
  } else if (process.platform === 'darwin') {
    command = 'ps -ef'; proc = '/Applications/Deezer.app';
  }
  if (execSync(command).includes(proc))
    execSync(process.platform === 'win32' ? `taskkill /f /im ${proc}` : 'killall Deezer');
};

module.exports.relaunch = () => {
  module.exports.kill();
  if (process.platform === 'win32') {
    spawn(join(paths.program, 'Deezer.exe'), [], {
      detached: true
    });
  } else if (process.platform === 'darwin') {
    spawn('open', [paths.program], {
      detached: true
    });
  }
};
