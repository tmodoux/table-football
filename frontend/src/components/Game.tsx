import { ReactNode, useEffect, useState } from "react";
import { PlayerType } from "../App";
import { Button, InputNumber, List, Row, Space } from "antd";
import { ReactComponent as Player1Icon } from "../icons/player1.svg";
import { ReactComponent as Player2Icon } from "../icons/player2.svg";
import CustomIcon from "./CustomIcon";
import {
  CREATE_GAME,
  END_GAME,
  GET_CURRENT_GAME,
  UPDATE_GAME,
} from "../queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MessageInstance } from "antd/es/message/interface";
import CustomAlert from "./CustomAlert";

type GamePropsType = {
  players?: PlayerType[];
  updatePlayers?: (players: PlayerType[]) => void;
  messageApi?: MessageInstance;
  isLive?: boolean;
};

type GameType = {
  id: string;
  player1: string;
  player2: string;
  goals1: number;
  goals2: number;
};

const Game = ({
  players = [],
  updatePlayers = () => {},
  messageApi,
  isLive = false,
}: GamePropsType) => {
  const newGame: GameType = {
    id: "",
    player1: "",
    player2: "",
    goals1: 0,
    goals2: 0,
  };
  const [currentGame, setCurrentGame] = useState<GameType>(newGame);
  const isPlayerSelection = !currentGame.player1 || !currentGame.player2;
  const isGameCreation = isLive && !currentGame.id;
  const isGamePlaying = !!currentGame.id;

  const [getCurrentGame] = useLazyQuery(GET_CURRENT_GAME, {
    onCompleted(data) {
      const currentGame = data.getCurrentGame[0];
      if (currentGame) {
        setCurrentGame({
          id: currentGame.id,
          player1: currentGame.player1,
          player2: currentGame.player2,
          goals1: currentGame.goals1,
          goals2: currentGame.goals2,
        });
        messageApi?.success("Live game successfully loaded!");
      }
    },
    onError(error) {
      messageApi?.error("Error while loading current game!");
      console.log(error);
    },
  });

  const [createGame] = useMutation(CREATE_GAME, {
    onCompleted(data) {
      setCurrentGame({ ...currentGame, id: data.createGame.id });
      messageApi?.success("Game successfully created!");
    },
    onError(error) {
      messageApi?.error("Error while creating game!");
      console.log(error);
    },
    variables: {
      data: { player1: currentGame.player1, player2: currentGame.player2 },
    },
  });

  const [updateGame] = useMutation(UPDATE_GAME, {
    onError(error) {
      messageApi?.error("Error while updating game!");
      console.log(error);
    },
  });

  const [endGame] = useMutation(END_GAME, {
    onCompleted(data) {
      updatePlayers(data.endGame);
      setCurrentGame(newGame);
      messageApi?.success("Scores successfully updated!");
    },
    onError(error) {
      messageApi?.error("Error while ending game!");
      console.log(error);
    },
    variables: { data: currentGame },
  });

  const updateScore = (key: string, value: number | null) => {
    const updatedGame = { ...currentGame, [key]: value || 0 };
    setCurrentGame(updatedGame);
    if (isLive) {
      const { id, ...game } = updatedGame;
      updateGame({
        variables: { id, data: game },
      });
    }
  };

  const clickPlayer = (playerId: string): void => {
    if (playerId === currentGame.player1) {
      setCurrentGame({ ...currentGame, player1: "" });
    } else if (playerId === currentGame.player2) {
      setCurrentGame({ ...currentGame, player2: "" });
    } else if (!currentGame.player1) {
      setCurrentGame({ ...currentGame, player1: playerId });
    } else if (!currentGame.player2) {
      setCurrentGame({ ...currentGame, player2: playerId });
    }
  };

  const getPlayerIcon = (playerId: string): ReactNode => {
    if (playerId !== currentGame.player1 && playerId !== currentGame.player2) {
      return <></>;
    } else {
      return (
        <CustomIcon
          component={
            playerId === currentGame.player1 ? Player1Icon : Player2Icon
          }
        />
      );
    }
  };

  const playersData = players.map((player) => (
    <Button
      className="center-inline"
      disabled={isGamePlaying}
      key={player.id}
      icon={getPlayerIcon(player.id)}
      onClick={() => clickPlayer(player.id)}
    >
      {player.name} ({player.id})
    </Button>
  ));

  useEffect(() => {
    if (isLive) getCurrentGame();
  }, [isLive, getCurrentGame]);

  return (
    <>
      <CustomAlert
        numPlayers={players.length}
        isGameCreation={isGameCreation}
        isGamePlaying={isGamePlaying}
      />
      {players.length ? (
        <Space direction="vertical">
          <b>Players</b>
          <Row>{playersData}</Row>
          {isGameCreation || (
            <>
              <b>Scores</b>
              {[
                { key: "goals1", icon: Player1Icon, value: currentGame.goals1 },
                { key: "goals2", icon: Player2Icon, value: currentGame.goals2 },
              ].map((score) => (
                <InputNumber
                  key={score.key}
                  addonBefore={<CustomIcon component={score.icon} />}
                  value={score.value}
                  min={0}
                  onChange={(value) => updateScore(score.key, value)}
                />
              ))}
            </>
          )}
          <Button
            size="large"
            disabled={isPlayerSelection}
            onClick={() => (isGameCreation ? createGame() : endGame())}
          >
            {isGameCreation ? "Start game" : isLive ? "End game" : "Save game"}
          </Button>
        </Space>
      ) : (
        <></>
      )}
    </>
  );
};

export default Game;
