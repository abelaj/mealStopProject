import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { CookiesProvider } from 'react-cookie';
import ApolloClient from 'apollo-boost';
import styles from './app.module.css';
import Header from './Components/header.js';
import { Menu, Login, Logout, EditMenu, OrdersView, Register, CourierView } from './views'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

  return (
    <ApolloProvider client={client}>
      <CookiesProvider>

        <Router>
          <div className={styles.container}>
            <div>
              <Header />
              <Switch>
                <Route exact path="/" component={Menu} />
                <Route path="/login/customer" component={() => <Login type="customer" />} />
                <Route path="/register/customer" component={() => <Register type="customer" />} />
                <Route path="/login/restaurant" component={() => <Login type="restaurant" />} />
                <Route path="/restaurant/menu/edit" component={EditMenu} />
                <Route path="/orders" component={OrdersView} />
                <Route path="/courier" component={CourierView} />
                <Route path="/logout" component={Logout} />
              </Switch>
            </div>

          </div>
        </Router>
      </CookiesProvider>

    </ApolloProvider>
  );
}

export default App;
