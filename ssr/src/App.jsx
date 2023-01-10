import * as React from "react";
import { Link } from "react-router";

import { useQuery, gql } from "@apollo/client";

export default function App(props) {
  return (
    <div>
      <h1>SSR App</h1>
      <ul role="nav">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
        <li>
          <Link to="/players">Players</Link>
        </li>
      </ul>

      {props.children}
    </div>
  );
}

export function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This page is SERVER-side rendered!</p>
    </div>
  );
}

export function Counter() {
  const [clicks, setClicks] = React.useState(0);
  return (
    <div>
      <h1>Clicks: {clicks}</h1>
      <button onClick={() => setClicks((clicks) => clicks + 1)}>Click</button>
    </div>
  );
}

export const PLAYERS = gql`
  query getPlayers {
    players {
      id
      name
    }
  }
`;

export function Players() {
  const { loading, data } = useQuery(PLAYERS);

  if (loading) {
    return <p>Loading players...</p>;
  }

  return (
    <div>
      <h1>Players</h1>
      <ul>
        {data.players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
}
