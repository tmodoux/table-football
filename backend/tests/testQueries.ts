export const GET_PLAYERS = `
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

export const CREATE_PLAYER = `
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

export const GET_CURRENT_GAME = `
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

export const CREATE_GAME = `
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

export const UPDATE_GAME = `
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

export const END_GAME = `
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
