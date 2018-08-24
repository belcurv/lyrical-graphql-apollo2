/* ================================= SETUP ================================= */

import './index.css';

import React                                     from 'react';
import ReactDOM                                  from 'react-dom';
import { ApolloProvider }                        from 'react-apollo';
import { HashRouter, Route, Switch }             from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

import SongList   from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  link  : new HttpLink({ uri : 'http://localhost:3000/graphql'}),
  cache : new InMemoryCache({
    dataIdFromObject : (obj) => obj.id
  })
});


/* ========================= COMPONENT DEFINITION ========================== */

const Root = () => (
  <ApolloProvider client={ client }>
    <HashRouter>
      <div className="container">
        <Switch>
          <Route exact path="/"    component={ SongList } />
          <Route path="/songs/new" component={ SongCreate } />
          <Route path="/songs/:id" component={ SongDetail } />
        </Switch>
      </div>
    </HashRouter>
  </ApolloProvider>
);


/* ================================ RENDER ================================= */

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
