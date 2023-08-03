import { PlayerType } from "../App";
import { Alert, Table } from "antd";

type ScoreboardPropsType = {
  players?: PlayerType[];
};

const Scoreboard = ({ players = [] }: ScoreboardPropsType) => {
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
      ratio: player.played ? +(player.wins / player.played).toPrecision(2) : 0,
      goalsFor: player.goalsFor,
      goalsAgainst: player.goalsAgainst,
      goalsDifference: player.goalsFor - player.goalsAgainst,
    };
  }).sort((p1, p2) => {
    if (p1.ratio !== p2.ratio) {
      return p2.ratio - p1.ratio;
    }
    if (p1.goalsDifference !== p2.goalsDifference) {
      return p2.goalsDifference - p1.goalsDifference;
    }
    if (p1.goalsFor !== p2.goalsFor) {
      return p2.goalsFor - p1.goalsFor;
    }
    return p1.playerName.localeCompare(p2.playerName);
  });

  return (
    <div>
      <h2><u>Scoreboard</u></h2>
      <Alert banner type="info" description="Players are ranked by Ratio first, then Goals difference, then Goals For, then Player name." showIcon={false} />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Scoreboard;
