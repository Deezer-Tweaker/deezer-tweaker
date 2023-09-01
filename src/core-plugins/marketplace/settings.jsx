/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

// eslint-disable-next-line no-unused-vars
const SettingsComponent = () => {
  return (
    <>
      <div>
        <Switch label="Auto-update plugins" enabled={true} />
        <Switch label="Auto-update themes" enabled={true} />
      </div>
      <div className="container">
        <Button>Check for updates</Button>
      </div>
    </>
  );
};
