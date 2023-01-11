const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Query to get players array"
    players: [Player!]!
  }

  "Details for an NBA player"
  type Player {
    id: ID!
    "Player's first and last name"
    name: String!
  }
`;

module.exports = typeDefs;
