/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

const builder = require('electron-builder');

builder.build({
  targets: builder.Platform.WINDOWS.createTarget(),
  config: {
    files: [
      'src/*.js',
      'src/core-plugins/*.js',
      'src/core-plugins/**/*.js',
      'commands/*.js',
      'utils/*.js',
    ],
    win: {
      target: [{
        target: 'portable',
        arch: ['x64']
      }],
    }
  }
});
