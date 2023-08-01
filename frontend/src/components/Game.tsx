import React, { useState } from "react";
import { PlayerType } from "../App";
import { Alert, Button, InputNumber } from "antd";

type GamePropsType = {
  players: PlayerType[];
};

const Game = ({ players }: GamePropsType) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const handleScore1Change = (value: any) => {
    setScore1(value);
  };

  const handleScore2Change = (value: any) => {
    setScore2(value);
  };

  const clickPlayer = (playerId: string): void => {
    if (playerId === player1) {
      setPlayer1("");
    } else if (playerId === player2) {
      setPlayer2("");
    } else if (!player1) {
      setPlayer1(playerId);
    } else if (!player2) {
      setPlayer2(playerId);
    }
  };

  return (
    <div>
      <h2>Current game</h2>
      <Alert
        message={<u>Players selection</u>}
        description={
          players.length
            ? "You can choose Player 1 and Player 2 by clicking on their names just below. Then enter or increment their respective score."
            : 'You must first create some players using the "Add a new player" form below'
        }
        type={players.length ? "info" : "warning"}
        showIcon
        banner
      />
      <div
        style={{
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        {players.map((player) => (
          <Button
            key={player.id}
            size="large"
            onClick={() => clickPlayer(player.id)}
          >
            {player.name} ({player.id})
          </Button>
        ))}
      </div>
      <div>
        <InputNumber value={score1} min={0} onChange={handleScore1Change} />
        <InputNumber value={score2} min={0} onChange={handleScore2Change} />
      </div>
      <Button size="large">End current game</Button>
    </div>
  );
};

export default Game;
