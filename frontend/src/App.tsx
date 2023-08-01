import { useState } from "react";
import "./App.css";
import Scoreboard from "./components/Scoreboard";

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
      id: "1",
      name: "jeanne",
      wins: 4,
      losses: 3,
      goalsFor: 12,
      goalsAgainst: 9,
    },
  ]);

  return (
    <div className="App">
      <Scoreboard players={players} />
    </div>
  );
}

export default App;
