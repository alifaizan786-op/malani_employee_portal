import './App.css';

import LoginPage from './pages/LoginPage';

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D0039',
      light:'#efefef'
    },
    secondary: {
      main: "#D2AB67",
    },
  },
  breakpoints: {
    values: {
      sm: 640,
      md: 1007,
      lg: 1280,
      xl: 1536,
    },
  },
  drawer: {
    display: "flex",
    justifyContent: "space-between",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginPage />
    </ThemeProvider>
  );
}

export default App;
