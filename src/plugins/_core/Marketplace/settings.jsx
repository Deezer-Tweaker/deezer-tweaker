/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

// eslint-disable-next-line no-unused-vars
const SettingsComponent = () => {
  /* global React */
  const [settings, setSettings] = React.useState({
    auto_update_plugins: true,
    auto_update_themes: true
  });

  const updateSettings = (key, e) => {
    settings[key] = e.target.checked ?? e.target.value;
    setSettings(settings);
  };

  return (
    <>
      <FormControl>
        <Flex>
          <Label color="text.main">Auto-update plugins</Label>
          <Switch
            isChecked={settings.auto_update_plugins}
            onChange={(e) => updateSettings('auto_update_plugins', e)}
          />
        </Flex>
      </FormControl>
      <FormControl>
        <Flex>
          <Label color="text.main">Auto-update themes</Label>
          <Switch
            isChecked={settings.auto_update_themes}
            onChange={(e) => updateSettings('auto_update_themes', e)}
          />
        </Flex>
      </FormControl>
      <div className="container">
        <Button colorScheme="primary">Check for updates</Button>
      </div>
    </>
  );
};
