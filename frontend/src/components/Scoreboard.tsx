import { PlayerType } from "../App";
import { Table } from "antd";

type ScoreboardPropsType = {
  players: PlayerType[];
};

const Scoreboard = ({ players }: ScoreboardPropsType) => {
  const columns = [
    {
      title: "Player name",
      dataIndex: "playerName",
    },
    {
      title: "Games played",
      dataIndex: "gamesPlayed",
    },
    {
      title: "Wins",
      dataIndex: "wins",
    },
    {
      title: "Losses",
      dataIndex: "losses",
    },
    {
      title: "Ratio",
      dataIndex: "ratio",
    },
    {
      title: "Goals For",
      dataIndex: "goalsFor",
    },
    {
      title: "Goals Against",
      dataIndex: "goalsAgainst",
    },
    {
      title: "Goals Difference",
      dataIndex: "goalsDifference",
    },
  ];

  const data = players.map((player) => {
    return {
      key: player.id,
      playerName: player.name,
      gamesPlayed: player.played,
      wins: player.wins,
      losses: player.losses,
      ratio: player.wins ? player.played / player.wins : "-",
      goalsFor: player.goalsFor,
      goalsAgainst: player.goalsAgainst,
      goalsDifference: player.goalsFor - player.goalsAgainst,
    };
  });

  return (
    <div>
      <h2>Scoreboard</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Scoreboard;
