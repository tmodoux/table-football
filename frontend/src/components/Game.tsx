import { ReactNode, useState } from "react";
import { PlayerType } from "../App";
import { Alert, Button, InputNumber } from "antd";
import { ReactComponent as Player1Icon } from "../icons/player1.svg";
import { ReactComponent as Player2Icon } from "../icons/player2.svg";
import CustomIcon from "./CustomIcon";
import { END_GAME, GET_CURRENT_GAME, UPDATE_GAME } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import { MessageInstance } from "antd/es/message/interface";

type GamePropsType = {
  players: PlayerType[];
  updatePlayers: (players: PlayerType[]) => void;
  messageApi: MessageInstance;
};

const Game = ({ players, updatePlayers, messageApi }: GamePropsType) => {
  const newGame = {
    id: "",
    player1: "",
    player2: "",
    goals1: 0,
    goals2: 0,
    isPlaying: true,
  };
  const [currentGame, setCurrentGame] = useState(newGame);
  const isLive = true;

  useQuery(GET_CURRENT_GAME, {
    onCompleted(data) {
      const currentGame = data.getCurrentGame;
      if (currentGame) {
        setCurrentGame({
          id: currentGame.id,
          player1: currentGame.player1,
          player2: currentGame.player2,
          goals1: currentGame.goals1,
          goals2: currentGame.goals2,
          isPlaying: currentGame.isPlaying,
        });
        messageApi.success("Current game successfully loaded!");
      }
    },
    onError(error) {
      messageApi.error("Error while loading current game!");
      console.log(error);
    },
  });

  const [endGame] = useMutation(END_GAME, {
    onCompleted(data) {
      updatePlayers(data.endGame);
      setCurrentGame(newGame);
      messageApi.success("Scores successfully updated!");
    },
    onError(error) {
      messageApi.error("Error while ending game!");
      console.log(error);
    },
    variables: { data: currentGame }
  });

  const [updateGame] = useMutation(UPDATE_GAME, {
    onCompleted() {
      messageApi.success("Game successfully updated!");
    },
    onError(error) {
      messageApi.error("Error while updating game!");
      console.log(error);
    },
  });

  const clickPlayer = (playerId: string): void => {
    if (playerId === currentGame.player1) {
      updateGameField("player1", "");
    } else if (playerId === currentGame.player2) {
      updateGameField("player2", "");
    } else if (!currentGame.player1) {
      updateGameField("player1", playerId);
    } else if (!currentGame.player2) {
      updateGameField("player2", playerId);
    }
  };

  const getPlayerIcon = (playerId: string): ReactNode => {
    if (playerId !== currentGame.player1 && playerId !== currentGame.player2) {
      return <></>;
    } else {
      return (
        <CustomIcon
          component={playerId === currentGame.player1 ? Player1Icon : Player2Icon}
        />
      );
    }
  };

  const updateGameField = (fieldName: string, value?: string | number) => {
    const updatedGame = { ...currentGame, [fieldName]: value };
    setCurrentGame(updatedGame);
    if (isLive) {
      const { id, ...game } = updatedGame;
      updateGame({
        variables: { id, data: game }
      });
    }
  }

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
            icon={getPlayerIcon(player.id)}
            onClick={() => clickPlayer(player.id)}
            style={{
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            {player.name} ({player.id})
          </Button>
        ))}
      </div>
      <div>
        <InputNumber
          addonBefore={<CustomIcon component={Player1Icon} />}
          value={currentGame.goals1}
          min={0}
          onChange={(value) => updateGameField("goals1", value || 0)}
        />
        <InputNumber
          addonBefore={<CustomIcon component={Player2Icon} />}
          value={currentGame.goals2}
          min={0}
          onChange={(value) => updateGameField("goals2", value || 0)}
        />
      </div>
      <Button size="large" disabled={!currentGame.player1 || !currentGame.player2} onClick={() => endGame()}>
        {"End current game"}
      </Button>
    </div>
  );
};

export default Game;
