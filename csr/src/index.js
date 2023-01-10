import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, browserHistory } from "react-router";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App, { About, Counter, Players } from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/about" component={About} />
        <Route path="/counter" component={Counter} />
        <Route path="/players" component={Players} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
