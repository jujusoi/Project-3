import { Outlet } from 'react-router-dom';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/headerFooter/header';
import Footer from './components/headerFooter/footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <header>
        <Header />
      </header>
      <main>
        <section>
          <Outlet />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </ApolloProvider>
    </>
  );
};

export default App
