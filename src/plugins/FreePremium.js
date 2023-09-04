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

// Remove limited mode
replaceInFile(findFile('app-web'), /[a-zA-Z]{1,2}.user_status.limited/g, 'false');

// Set offer ID
replaceInFile(findFile('legacy'), /([a-zA-Z].user.offerId|[a-zA-Z].OFFER_ID)/g, '(600)');
replaceInFile(findFile('route-naboo'), /(userOfferId:)(Object\([a-zA-Z].[a-zA-Z]{1,2}\)\([a-zA-Z]\)|[a-zA-Z][^},])/g, '$1600');
replaceInFile(findFile('route-naboo'), /(getOfferId:function\(\)\{return )Object\(z.z\)\(g.a.getState\(\).user\)(})/g, '$1600$2');

// Remove upgrade buttons
replaceInFile(findFile('legacy'), /Object\(r.a\)\([a-zA-Z],"USER.ENTRYPOINTS",""\)/g, '{}');
replaceInFile(findFile('route-naboo'), /(entryPoints:)Object\(A.l\)\([a-zA-Z].user\)/g, '$1{}');

// Enable downloading songs
replaceInFile(findFile('app-web'), /this.props.hasDownload/, 'true');
replaceInFile(findFile('app-web'), /const(\{([a-zA-Z:,]+)?userHasDownload:([a-zA-Z])([a-zA-Z:,]+)?}=[a-zA-Z]),/g, 'let $1;$3=true;const ');

['app-web', 'route-naboo'].forEach(file => {
  replaceInFile(findFile(file), /(userHasDownload):Object\([a-zA-Z].[a-zA-Z]\)\([a-zA-Z]\)/g, '$1:true');
});
['route-playlist', 'route-album', 'route-show', 'route-episode', 'route-track'].forEach(file => {
  replaceInFile(findFile(file), /const(\{([a-zA-Z:,]+)?userHasDownload:([a-zA-Z])([a-zA-Z:,]+)?}=this.props);/g, 'let $1;$3=true;');
  replaceInFile(findFile(file), /(const\{([a-zA-Z:,]+)?isDownloadable:[a-zA-Z]([a-zA-Z:,]+)?}=[a-zA-Z].[a-zA-Z].useContext\([a-zA-Z].[a-zA-Z]\);return )[a-zA-Z]/g, '$1true');

  replaceInFile(findFile(file), /(userHasDownload):Object\([a-zA-Z].[a-zA-Z]\)\([a-zA-Z]\)/g, '$1:true');
  replaceInFile(findFile(file), /(isDownloadable):(![0-9]|Object\([a-zA-Z].[a-zA-Z]\)\([a-zA-Z]\))/g, '$1:true');
});
replaceInFile(
  findFile('route-profile'),
  /(_getTabList\(\)\{const{[a-zA-Z:,]+}=this.props,[a-zA-Z]=[a-zA-Z]{1,2}\([a-zA-Z],)[a-zA-Z]/g,
  '$1true'
);
