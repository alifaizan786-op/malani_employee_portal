import './App.css';

import LoginPage from './pages/LoginPage';
import Main from './pages/Main';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route } from 'react-router-dom'; 


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


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
      <ApolloProvider client={client}>

      {Auth.loggedIn() ? (
        <Main/>
      ):(
        <LoginPage/>
      )}

      </ApolloProvider>
    </ThemeProvider>

  );
}

export default App;
