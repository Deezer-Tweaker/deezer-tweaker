/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

// eslint-disable-next-line no-unused-vars
const InstalledComponent = () => {
  /* global fs, join, paths */

  const plugins = fs.readdirSync(join(paths.data, 'plugins')).map(f => {
    return require(join(paths.data, 'plugins', f, `${f}.js`));
  });

  return (
    <>
      <DataComponent title="Plugins" data={plugins} />
      <DataComponent title="Themes" data={[]} />
    </>
  );
};
