import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
      dark_green: '#045d56',
      orange: '#FF6859',
      yellow: '#FFCF44',
      purple: '#B15DFF',
      blue: '#72DEFF',
      gray: '#EEE'
    },
    secondary: {
      main: '#33333b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#27272f',
    },
  },
});

export default theme;
