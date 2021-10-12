import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import DataContext from "../../context/DataContext";
import ButtonHome from "../ButtonHome";
import ButtonPlayAgain from "../ButtonPlayAgain";

import "../../styles/app.scss";
import "./styles.scss";

const Game = () => {
  const history = useHistory();

  const { sea, setSea, numberOfShips, levelSelected, addScore } =
    useContext(DataContext);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const [remainingAttempts, setRemainingAttempts] = useState(0);
  const [missedAttempts, setMissedAttempts] = useState(0);
  const [successfulAttempts, setSuccessfulAttempts] = useState(0);
  const [firedShip, setFiredShip] = useState(0);
  const [sunkenShips, setSunkenShips] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    if (!levelSelected) history.push("/");
  }, [history, levelSelected]);

  useEffect(() => {
    if (levelSelected) setRemainingAttempts(levelSelected.attempts);
  }, [levelSelected]);

  useEffect(() => {
    checkIfSunkenShip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successfulAttempts]);

  useEffect(() => {
    if (isPlaying) {
      if (sunkenShips === numberOfShips) {
        addScore(missedAttempts, successfulAttempts, sunkenShips, 1);
        setEndGame(true);
      }
      if (remainingAttempts > -1) {
        if (remainingAttempts === 0) {
          addScore(missedAttempts, successfulAttempts, sunkenShips, 0);
          setEndGame(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sunkenShips, remainingAttempts]);

  const handleShoot = (row, column) => {
    const newArray = [...sea];
    const value = newArray[row][column];

    let newStatus = 0;

    if (!endGame) {
      setIsPlaying(true);
      if (value.status === 0) {
        newStatus = 3;
        setMissedAttempts(missedAttempts + 1);
        setRemainingAttempts(remainingAttempts - 1);
      } else if (value.status === 1) {
        newStatus = 2;
        setFiredShip(value.shipId);
        setSuccessfulAttempts(successfulAttempts + 1);
        setRemainingAttempts(remainingAttempts - 1);
      } else {
        newStatus = value.status;
      }

      newArray[row][column] = { status: newStatus, shipId: value.shipId };
      setSea([...newArray]);
    }
  };

  const checkIfSunkenShip = () => {
    if (firedShip > 0) {
      let isSunk = true;
      sea.forEach((row) =>
        row.forEach((cell) => {
          if (cell.shipId === firedShip) {
            if (cell.status === 1) {
              isSunk = false;
            }
          }
        })
      );
      if (isSunk) {
        setSunkenShips(sunkenShips + 1);
      }
    }
  };

  return (
    <div className="game">
      <div className="sea">
        <div className="row-header">
          {Array(11)
            .fill(1)
            .map((item, index) => (
              <div key={index} className="cell-header">
                {index === 0 ? "" : index}
              </div>
            ))}
        </div>
        {sea.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <div className="cell-header">{letters[rowIndex]}</div>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell cell-${cell.status} ${
                  endGame && cell.status === 1 ? "cell-ship" : ""
                }`}
                onClick={() => handleShoot(rowIndex, colIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="score">
        <div className="score-item">
          <div className="score-title">Sunken</div>
          <div className="score-value">{sunkenShips}</div>
        </div>
        <div className="score-item">
          <div className="score-title">Successful</div>
          <div className="score-value">{successfulAttempts}</div>
        </div>
        <div className="score-item">
          <div className="score-title">Missed</div>
          <div className="score-value">{missedAttempts}</div>
        </div>
        <div className="score-item">
          <div className="score-title">Remaining</div>
          <div className="score-value">
            {remainingAttempts < 0 ? (
              <i className="fas fa-infinity"></i>
            ) : (
              remainingAttempts
            )}
          </div>
        </div>
      </div>
      {endGame && (
        <>
          <div className="message animate__animated animate__bounceInDown">
            {sunkenShips === numberOfShips ? "You Win!!" : "Game Over"}
          </div>
          <ButtonPlayAgain />
        </>
      )}
      <ButtonHome />
    </div>
  );
};

export default Game;
