const ThemesComponent = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  if (loading) {
    setLoading(false);
    setData([]); // There's no repo for the themes for now
  }

  return loading ? <div>Loading</div> : <DataComponent title="Themes" data={data} />;
};
