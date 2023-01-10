import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { match, RouterContext } from 'react-router'
import App from "./src/App";
import express from "express";
import crossFetch from 'cross-fetch';

import routes from './routes'

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { renderToStringWithData } from "@apollo/client/react/ssr";

function Html({ content, state }) {
  return (
    <html>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>SSR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
        }} />
        <script src="bundle.js" defer></script>
      </body>
    </html>
  );
}

const app = express();
app
  .disable("x-powered-by")
  .use(express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" }))
  .get("*", (req, res) => {
      // Note that req.url here should be the full URL path from
      // the original request, including the query string.
      match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
          res.status(500).send(error.message)
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          const client = new ApolloClient({
            ssrMode: true,
            link: createHttpLink({
              uri: 'http://localhost:4000',
              credentials: 'same-origin',
              fetch: crossFetch, // https://github.com/apollographql/apollo-client/issues/9552#issuecomment-1113163281
              headers: {
                cookie: req.header('Cookie'),
              },
            }),
            cache: new InMemoryCache(),
          });

          const ComponentTree = (
            <ApolloProvider client={client}>
              <RouterContext {...renderProps}>
                <App />
              </RouterContext>
            </ApolloProvider>
          )

          renderToStringWithData(ComponentTree).then((content) => {
            // Extract the entirety of the Apollo Client cache's current state
            const initialState = client.extract();
          
            // Add both the page content and the cache state to a top-level component
            const html = <Html content={content} state={initialState} />;
          
            // Render the component to static markup and return it
            res.status(200);
            res.send(`<!doctype html>\n${ReactDOMServer.renderToString(html)}`);
            res.end();
          });
        } else {
          res.status(404).send('Not found')
        }
      })
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log("---------------------------------------");
  console.log(`Server listening on port ${PORT}!`);
  console.log(`Visit http://localhost:${PORT}/`);
  console.log("---------------------------------------");
});
