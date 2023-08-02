import { gql } from "@apollo/client";

export const GET_PLAYERS = gql`
  query GetPlayers {
    getPlayers {
      id
      name
      played
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
      played
      wins
      losses
      goalsFor
      goalsAgainst
    }
  }
`;

export const GET_CURRENT_GAME = gql`
  query GetCurrentGame {
    getCurrentGame {
      id
      player1
      player2
      goals1
      goals2
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGame($data: CreateGameInput!) {
    createGame(data: $data) {
      id
      player1
      player2
      goals1
      goals2
    }
  }
`;

export const UPDATE_GAME = gql`
  mutation UpdateGame($id: String!, $data: UpdateGameInput!) {
    updateGame(id: $id, data: $data) {
      id
      player1
      player2
      goals1
      goals2
    }
  }
`;

export const END_GAME = gql`
  mutation EndGame($data: EndGameInput!) {
    endGame(data: $data) {
      id
      name
      played
      wins
      losses
      goalsFor
      goalsAgainst
    }
  }
`;
