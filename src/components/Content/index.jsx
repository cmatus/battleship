import { Route, Switch } from "react-router-dom";

import "./styles.scss";
import MainMenu from "../MainMenu";
import NewGameMenu from "../NewGameMenu";
import LatestScores from "../LatestScores";
import Instructions from "../Instructions";
import Game from "../Game";
import End from "../End";

const Content = () => {
  return (
    <div className="content">
      <Switch>
        <Route path="/" exact component={MainMenu} />
        <Route path="/newGame" exact component={NewGameMenu} />
        <Route path="/latestScores" exact component={LatestScores} />
        <Route path="/instructions" exact component={Instructions} />
        <Route path="/game" exact component={Game} />
        <Route path="/end" exact component={End} />
      </Switch>
    </div>
  );
};

export default Content;
