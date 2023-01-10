import React from "react";
import { Route } from "react-router";
import App, { About, Counter, Players } from "./src/App";

module.exports = (
  <Route path="/" component={App}>
    <Route path="/about" component={About} />
    <Route path="/counter" component={Counter} />
    <Route path="/players" component={Players} />
  </Route>
);
