import React, { useState } from "react";
import { PlayerType } from "../App";
import { Button, Input } from "antd";
import { CREATE_PLAYER } from "../queries";
import { useMutation } from "@apollo/client";

type PlayerPropsType = {
  addPlayer: (player: PlayerType) => void;
};

const Player = ({ addPlayer }: PlayerPropsType) => {
  const [name, setName] = useState("");

  const [createPlayer] = useMutation(CREATE_PLAYER, {
    onCompleted(data) {
      addPlayer(data);
    },
  });

  const createNewPlayer = () => {
    createPlayer({ variables: { data: { name: name } } });
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
