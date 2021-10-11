import { useState } from "react";

import "./styles/app.scss";

function App() {
  /*

  1...10 - Ship
 
  0 - Water
  1 - Ship
  2 - Fire
  3 - Fail

  0: Horizontal
  1: Vertical

  */

  const initialStateSea = [
    Array(10).fill({ status: 0, shipId: 0 }),
    Array(10).fill({ status: 0, shipId: 0 }),
    Array(10).fill({ status: 0, shipId: 0 }),
    Array(10).fill({ status: 0, shipId: 0 }),
    Array(10).fill({ status: 0, shipId: 0 }),
    Array(10).fill({ status: 0, shipId: 0 }),
    Array(10).fill({ status: 0, shipId: 0 }),
    Array(10).fill({ status: 0, shipId: 0 }),
    Array(10).fill({ status: 0, shipId: 0 }),
    Array(10).fill({ status: 0, shipId: 0 }),
  ];

  const [sea, setSea] = useState(initialStateSea);

  const [remainingAttempts, setRemainingAttempts] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [successulAttempts, setSuccessulAttempts] = useState(0);
  //const [sunkenShips, setSunkenShips] = useState(0);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const putShip = (id, size) => {
    const row = randomIntFromInterval(0, 9);
    const column = randomIntFromInterval(0, 9);
    const orientation = randomIntFromInterval(0, 1);

    const newArray = [...sea];

    let collision = false;
    if (orientation === 1) {
      if (9 - row + 1 >= size) {
        for (let y = 0; y < size; y++) {
          if (newArray[row + y][column].status !== 0) {
            collision = true;
          }
        }
        if (!collision) {
          for (let y = 0; y < size; y++) {
            newArray[row + y][column] = { status: 1, shipId: id };
          }
        } else {
          putShip(id, size);
        }
      } else {
        for (let y = 0; y < size; y++) {
          if (newArray[row - y][column].status !== 0) {
            collision = true;
          }
        }
        if (!collision) {
          for (let y = 0; y < size; y++) {
            newArray[row - y][column] = { status: 1, shipId: id };
          }
        } else {
          putShip(id, size);
        }
      }
    } else {
      if (9 - column + 1 >= size) {
        for (let x = 0; x < size; x++) {
          if (newArray[row][column + x].status !== 0) {
            collision = true;
          }
        }
        if (!collision) {
          for (let x = 0; x < size; x++) {
            newArray[row][column + x] = { status: 1, shipId: id };
          }
        } else {
          putShip(id, size);
        }
      } else {
        for (let x = 0; x < size; x++) {
          if (newArray[row][column - x].status !== 0) {
            collision = true;
          }
        }
        if (!collision) {
          for (let x = 0; x < size; x++) {
            newArray[row][column - x] = { status: 1, shipId: id };
          }
        } else {
          putShip(id, size);
        }
      }
    }

    if (!collision) {
      setSea([...newArray]);
    }
  };

  const handleShoot = (row, column) => {
    const newArray = [...sea];
    const value = newArray[row][column];

    let newStatus = 0;
    if (value.status === 0) {
      newStatus = 3;
      setRemainingAttempts(remainingAttempts - 1);
      setFailedAttempts(failedAttempts + 1);
    } else if (value.status === 1) {
      newStatus = 2;
      setRemainingAttempts(remainingAttempts - 1);
      setSuccessulAttempts(successulAttempts + 1);
    } else {
      newStatus = value.status;
    }

    newArray[row][column] = { status: newStatus, shipId: value.shipId };
    setSea([...newArray]);
  };

  const putAllShips = () => {
    putShip(1, 4);
    putShip(2, 3);
    putShip(3, 3);
    putShip(4, 2);
    putShip(5, 2);
    putShip(6, 2);
    putShip(7, 1);
    putShip(8, 1);
    putShip(9, 1);
    putShip(10, 1);
  };

  return (
    <div className="App">
      <div className="sea">
        {sea.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell cell-${cell.status}`}
                onClick={() => handleShoot(rowIndex, colIndex)}
              >
                {cell.shipId > 0 ? cell.shipId : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => setSea(initialStateSea)}>Clear</button>
      <button onClick={putAllShips}>Put Ships</button>
    </div>
  );
}

export default App;
