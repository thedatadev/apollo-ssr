const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const mocks = {
  Query: () => ({
    players: () => [
      {
        id: 30,
        name: "Stephen Curry",
      },
      {
        id: 11,
        name: "Klay Thompson",
      },
      {
        id: 23,
        name: "Draymond Green",
      },
    ],
  }),
};

const server = new ApolloServer({
  typeDefs,
  mocks,
});

const PORT = 4000;

server.listen().then(() => {
  console.log(`Server is running on http://localhost:${PORT}/
`);
});
