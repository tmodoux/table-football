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

export const CREATE_PLAYER = gql`
  mutation CreatePlayer($data: CreatePlayerInput!) {
    createPlayer(data: $data) {
      id
      name
      wins
      losses
      goalsFor
      goalsAgainst
    }
  }
`;

export const UPDATE_SCORE = gql`
  mutation UpdateScore($data: UpdateScoreInput!) {
    updateScore(data: $data) {
      id
      name
      wins
      losses
      goalsFor
      goalsAgainst
    }
  }
`;
