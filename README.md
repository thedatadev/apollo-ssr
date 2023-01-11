# Apollo SSR + CSR example

---

## About

This repo is a small experiment to compare how client- and server-side rendering works with Apollo client.

The client is built with React, and contains three different views:

- About - _Static page indicating whether the app is client- or server-side rendered_
- Counter - _A page that counts how many times the button is clicked. This acts as proof that the bundle.js file is successfully fetched and loaded on the browser_
- Players - _A page that fetches a mocked response from the Apollo server. This acts as proof that the app is successfully fetching and receiving data from the Apollo server_

---

## Instructions

### Server-side rendering (SSR)

1. Build and run Apollo server

```
cd apolloServer
npm i
npm start
```

2. Build and run server-side rendered React app

```
cd ssr/
npm i
npm run build
npm run start
```

3. Visit http://localhost:3003/

4. Inspect the network tab and see that a request was NOT made to the Apollo server

### Client-side rendering (CSR)

1. Build and run Apollo server

```
cd apolloServer
npm i
npm start
```

2. Build and run client-side rendered React app

```
cd csr/
npm i
npm start
```

3. Visit http://localhost:3000/

4. Inspect the network tab and see that a request was made to the Apollo server

---

## Resources

- https://www.apollographql.com/docs/react/performance/server-side-rendering/
- https://www.apollographql.com/docs/react/api/react/ssr/
- https://github.com/remix-run/react-router/tree/v3.2.6/docs
- https://dev.to/juhanakristian/basics-of-react-server-side-rendering-with-expressjs-phd
