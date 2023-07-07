const InstalledComponent = () => {
  const plugins = fs.readdirSync(join(paths.data, 'plugins')).map(f => {
    return require(join(paths.data, 'plugins', f, 'manifest.json'));
  });
  return (
    <>
      <DataComponent title="Plugins" data={plugins} />
      <DataComponent title="Themes" data={[]} />
    </>
  )
}
