import { Link } from "react-router-dom";

import "./styles.scss";

const MainMenu = () => {
  return (
    <div className="menu">
      <div className={`menu-item shadow`}>
        <Link to="/newGame">New Game</Link>
      </div>
      <div className={`menu-item shadow`}>
        <Link to="/latestScores">Latest Scores</Link>
      </div>
      <div className={`menu-item shadow`}>
        <Link to="/instructions">Instructions</Link>
      </div>
    </div>
  );
};

export default MainMenu;
