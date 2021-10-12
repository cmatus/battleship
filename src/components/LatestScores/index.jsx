import { useContext } from "react";

import DataContext from "../../context/DataContext";
import ButtonHome from "../ButtonHome";

import "./styles.scss";

const LatestScores = () => {
  const { scores } = useContext(DataContext);

  return (
    <div className="latest-scores">
      <div className="latest-scores-title">Latest Scores</div>
      <div className="latest-scores-table">
        <div className="latest-scores-header">
          <div className="latest-scores-header-item">Status</div>
          <div className="latest-scores-header-item">Sunken</div>
          <div className="latest-scores-header-item">Successful</div>
          <div className="latest-scores-header-item">Fail</div>
        </div>
        <div className="latest-scores-detail scroll">
          {scores.map((score, index) => (
            <div key={index} className="latest-scores-detail-row">
              <div className="latest-scores-detail-cell">
                {score.status === 1 ? "Winner" : "Game Over"}
              </div>
              <div className="latest-scores-detail-cell">
                {score.sunkenShips}
              </div>
              <div className="latest-scores-detail-cell">
                {score.successfulAttempts}
              </div>
              <div className="latest-scores-detail-cell">
                {score.missedAttempts}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ButtonHome />
    </div>
  );
};

export default LatestScores;
