import { useState } from "react";
import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Game from "./components/Game";
import Player from "./components/Player";

export type PlayerType = {
  id: string;
  name: string;
  wins: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
};

function App() {
  const [players, setPlayers] = useState<PlayerType[]>([
    {
      id: "1",
      name: "jean",
      wins: 3,
      losses: 4,
      goalsFor: 9,
      goalsAgainst: 12,
    },
    {
      id: "2",
      name: "jeanne",
      wins: 4,
      losses: 3,
      goalsFor: 12,
      goalsAgainst: 9,
    },
  ]);

  const addPlayer = (player: PlayerType) => {
    setPlayers([...players, player]);
  };

  return (
    <div className="App">
      <Game players={players} />
      <Player addPlayer={addPlayer} />
      <Scoreboard players={players} />
    </div>
  );
}

export default App;
