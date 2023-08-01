import React, { useState } from "react";
import { PlayerType } from "../App";
import { Button, Input } from "antd";

type PlayerPropsType = {
  addPlayer: (player: PlayerType) => void;
};

const Player = ({ addPlayer }: PlayerPropsType) => {
  const [name, setName] = useState("");

  const createNewPlayer = () => {
    addPlayer({
      id: name,
      name: name,
      wins: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    });
    setName("");
  };

  return (
    <div>
      <h3>Add a new player</h3>
      <Input
        placeholder="Enter player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        size="large"
        onClick={() => createNewPlayer()}
        style={{
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        Create new player
      </Button>
    </div>
  );
};

export default Player;
