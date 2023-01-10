import * as React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from 'react-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import routes from '../routes'

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});

ReactDOM.hydrate(
    <ApolloProvider client={client}>
        <Router history={browserHistory} routes={routes} />
    </ApolloProvider>, 
    document.getElementById("root"),
);
