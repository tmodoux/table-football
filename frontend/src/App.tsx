import { useState } from "react";
import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Game from "./components/Game";
import Player from "./components/Player";
import { useQuery } from "@apollo/client";
import { GET_PLAYERS } from "./queries";
import { Tabs, message } from "antd";

export type PlayerType = {
  id: string;
  name: string;
  played: number;
  wins: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
};

function App() {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [messageApi, contextHolder] = message.useMessage({ maxCount: 1 });

  useQuery(GET_PLAYERS, {
    onCompleted(data) {
      updatePlayers(data.getPlayers);
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

  const tabItems = [
    {
      key: "live",
      label: "Live game",
      isLive: true,
    },
    {
      key: "offline",
      label: "Offline game",
      isLive: false,
    },
  ];

  return (
    <div className="App">
      {contextHolder}
      <Tabs
        centered
        defaultActiveKey="1"
        items={tabItems.map((item) => {
          return {
            key: item.key,
            label: item.label,
            children:
              <Game
                players={players}
                updatePlayers={updatePlayers}
                messageApi={messageApi}
                isLive={item.isLive}
              />
          }
        })}
      />
      <Player addPlayer={addPlayer} messageApi={messageApi} />
      <Scoreboard players={players} />
    </div>
  );
}

export default App;
