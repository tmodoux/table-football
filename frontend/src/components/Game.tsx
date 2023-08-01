import { ReactNode, useState } from "react";
import { PlayerType } from "../App";
import { Alert, Button, InputNumber } from "antd";
import { ReactComponent as Player1Icon } from "../icons/player1.svg";
import { ReactComponent as Player2Icon } from "../icons/player2.svg";
import CustomIcon from "./CustomIcon";
import { UPDATE_SCORE } from "../queries";
import { useMutation } from "@apollo/client";
import { MessageInstance } from "antd/es/message/interface";

type GamePropsType = {
  players: PlayerType[];
  updatePlayers: (players: PlayerType[]) => void;
  messageApi: MessageInstance;
};

const Game = ({ players, updatePlayers, messageApi }: GamePropsType) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const [updateScore] = useMutation(UPDATE_SCORE, {
    onCompleted(data) {
      updatePlayers(data.updateScore);
      messageApi.success("Scores successfully updated!");
    },
    onError(error) {
      messageApi.error("Error while updating scores!");
      console.log(error);
    },
  });

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

  const getPlayerIcon = (playerId: string): ReactNode => {
    if (playerId !== player1 && playerId !== player2) {
      return <></>;
    } else {
      return (
        <CustomIcon
          component={playerId === player1 ? Player1Icon : Player2Icon}
        />
      );
    }
  };

  const endGame = () => {
    let score;
    if (score1 === score2) {
      score = {
        winnerId: player1,
        winnerGoals: score1,
        looserId: player2,
        looserGoals: score2,
      };
    } else if (score1 > score2) {
      score = {
        winnerId: player1,
        winnerGoals: score1,
        looserId: player2,
        looserGoals: score2,
      };
    } else {
      score = {
        winnerId: player2,
        winnerGoals: score2,
        looserId: player1,
        looserGoals: score1,
      };
    }

    updateScore({ variables: { data: score } });

    setPlayer1("");
    setPlayer2("");
    setScore1(0);
    setScore2(0);
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
          value={score1}
          min={0}
          onChange={handleScore1Change}
        />
        <InputNumber
          addonBefore={<CustomIcon component={Player2Icon} />}
          value={score2}
          min={0}
          onChange={handleScore2Change}
        />
      </div>
      <Button size="large" disabled={!player1 || !player2} onClick={() => endGame()}>
        End current game
      </Button>
    </div>
  );
};

export default Game;
