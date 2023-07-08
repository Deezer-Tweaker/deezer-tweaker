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
