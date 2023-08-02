import { Alert } from "antd";

type CustomAlertPropsType = {
    numPlayers: number | null;
    isGameCreation: boolean;
    isGamePlaying: boolean;
};

enum Types {
    Info = "info",
    Warn = "warning",
    Error = "error",
    Success = "success"
}

enum Titles {
    PlayerSelection = "Players selection",
    LiveGame = "Live game",
    OfflineGame = "Offline game",
}

export const CustomAlert = ({ numPlayers, isGameCreation, isGamePlaying }: CustomAlertPropsType) => {
    let title = Titles.PlayerSelection;
    let type, description;
    if (!numPlayers) {
        description = 'You must first create some players using the "Add a new player" form below!';
        type = Types.Warn;
    } else if (isGameCreation) {
        description = 'Choose Player 1 and Player 2 by clicking on their name, then start the game!';
        type = Types.Info;
    } else if (isGamePlaying) {
        title = Titles.LiveGame;
        description = "You are tracking a live game: each time you increment the scores, the game will be saved.";
        type = Types.Success;
    } else {
        title = Titles.OfflineGame;
        description = "You can track an already played game: click on the players names, enter their scores and save the game.";
        type = Types.Info;
    }
    return (
        <Alert
            message={<u>{title}</u>}
            description={description}
            type={type}
            showIcon
            banner
        />
    );
};

export default CustomAlert;
