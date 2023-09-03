/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

const { replaceInFile } = require('../../utils/asar');
const { findFile } = require('../../utils/paths');

// Enables others audio qualities
replaceInFile(
  findFile('route-naboo'),
  /({hasHqAudioRight:[a-zA-Z],hasLosslessAudioRight:[a-zA-Z]}=this.props,[a-zA-Z]=)![a-zA-Z]&&![a-zA-Z]/g,
  '$1false&&false'
);

replaceInFile(
  findFile('route-naboo'),
  /({hasHqAudioRight:[a-zA-Z],conversionEntrypoints:[a-zA-Z]}=this.props;return )[a-zA-Z]/g,
  '$1true'
);

replaceInFile(
  findFile('route-naboo'),
  /(this.props|e).(hasHqAudioRight|hasLosslessAudioRight|isPremium)/g,
  'true'
);

// Trick Deezer into thinking you are a premium user
['naboo', 'page', 'profile'].forEach(page => {
  const file = findFile(`route-${page}`);
  replaceInFile(
    file,
    /(isPremiumUser|isPremium):(Object\([a-zA-Z].[a-zA-Z]{1,2}\)\([a-zA-Z]\)|[a-zA-Z],playerIsRadio)/g,
    '$1:true'
  );

  replaceInFile(file, /(if\([a-zA-Z]!==[a-zA-Z]\)return [a-zA-Z]&&)![a-zA-Z](\?void be.[a-zA-Z].push\(Object\()/g, '$1false$2');
});
