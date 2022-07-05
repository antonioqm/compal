import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: [
      '"Open Sans"',
      'BlinkMacSystemFont',
      'Roboto',
      '"Helvetica Neue"',
      'Arial'
    ].join(','),
  },
  palette: {
    primary: {
      main: '#64A70B',
    },
  },
});