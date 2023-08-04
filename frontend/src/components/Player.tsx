import { useState } from "react";
import { PlayerType } from "../App";
import { Button, Input, Space, Typography } from "antd";
import { CREATE_PLAYER } from "../queries";
import { useMutation } from "@apollo/client";
import { MessageInstance } from "antd/es/message/interface";

type PlayerPropsType = {
  addPlayer?: (player: PlayerType) => void;
  messageApi?: MessageInstance;
};

const Player = ({ addPlayer = () => { }, messageApi }: PlayerPropsType) => {
  const [name, setName] = useState("");

  const [createPlayer] = useMutation(CREATE_PLAYER, {
    onCompleted(data) {
      addPlayer(data.createPlayer);
      messageApi?.success("Players successfully created!");
    },
    onError(error) {
      messageApi?.error("Error while creating player!");
      console.log(error);
    },
  });

  const createNewPlayer = () => {
    createPlayer({ variables: { data: { name: name } } });
    setName("");
  };

  return (
    <>
      <Typography.Title level={4}>Add a new player</Typography.Title>
      <Space>
        <Input
          placeholder="Enter player name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          size="large"
          onClick={() => createNewPlayer()}
          disabled={!name}
        >
          Create new player
        </Button>
      </Space>
    </>
  );
};

export default Player;
