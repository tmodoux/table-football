import { useState } from "react";
import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Game from "./components/Game";
import Player from "./components/Player";
import { useQuery } from "@apollo/client";
import { GET_PLAYERS } from "./queries";
import { message } from "antd";

export type PlayerType = {
  id: string;
  name: string;
  wins: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
};

function App() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  useQuery(GET_PLAYERS, {
    onCompleted(data) {
      updatePlayers(data.players);
      messageApi.success("Players successfully loaded!");
    },
    onError(error) {
      messageApi.error("Error while loading players!");
      console.log(error);
    },
  });

  const addPlayer = (player: PlayerType) => {
    setPlayers([...players, player]);
  };

  const updatePlayers = (updatedPlayers: PlayerType[]) => {
    setPlayers(updatedPlayers);
  };

  return (
    <div className="App">
      {contextHolder}
      <Game
        players={players}
        updatePlayers={updatePlayers}
        messageApi={messageApi}
      />
      <Player addPlayer={addPlayer} messageApi={messageApi} />
      <Scoreboard players={players} />
    </div>
  );
}

export default App;
