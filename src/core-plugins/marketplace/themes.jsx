/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

// eslint-disable-next-line no-unused-vars
const ThemesComponent = () => {
  /* global React */

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  if (loading) {
    setLoading(false);
    setData([]); // There's no repo for the themes for now
  }

  return loading ? <div>Loading</div> : <DataComponent title="Themes" data={data} />;
};
