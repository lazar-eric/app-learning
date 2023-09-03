import React from 'react';

import { style } from '@amaui/style-react';
import { Line, Reset } from '@amaui/ui-react';

import Routes from './Routes';

const useStyle = style(theme => ({
  '@pure': {
    body: {
      margin: 0
    }
  },

  root: {
    width: '100vw',
    height: '100vh',
    background: 'beige'
  }
}), { name: 'App' });

const App = () => {
  const { classes } = useStyle();

  return (
    <Line
      justify='center'
      align='center'

      className={classes.root}
    >
      <Reset />

      <Routes />
    </Line>
  );
};

export default App;
