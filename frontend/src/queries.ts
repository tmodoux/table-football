import { gql } from "@apollo/client";

export const GET_PLAYERS = gql`
  query GetPlayers {
    players {
      id
      name
      wins
      losses
      goalsFor
      goalsAgainst
    }
  }
`;
