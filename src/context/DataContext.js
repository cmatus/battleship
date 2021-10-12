import React, { createContext, useState } from "react";
import randomIntFromInterval from "../helpers/randomIntFromInterval";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const levels = [
    {
      id: 1,
      name: "Easy",
      attempts: -1,
    },
    {
      id: 2,
      name: "Medium",
      attempts: 100,
    },
    {
      id: 3,
      name: "Hard",
      attempts: 50,
    },
  ];

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

  const ships = [
    {
      size: 4,
      quantity: 1,
    },
    {
      size: 3,
      quantity: 2,
    },
    {
      size: 2,
      quantity: 3,
    },
    {
      size: 1,
      quantity: 4,
    },
  ];

  const [scores, setScores] = useState([]);
  const [levelSelected, setLevelSelected] = useState(null);
  const [sea, setSea] = useState(initialStateSea);
  const [numberOfShips, setNumberOfShips] = useState(0);

  const cleanSea = () => {
    setSea(initialStateSea);
  };

  const addScore = (
    missedAttempts,
    successfulAttempts,
    sunkenShips,
    status
  ) => {
    setScores([
      ...scores,
      { missedAttempts, successfulAttempts, sunkenShips, status },
    ]);
  };

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

  const putAllShips = () => {
    let shipId = 0;
    ships.forEach((ship) => {
      for (let x = 0; x < ship.quantity; x++) {
        shipId++;
        putShip(shipId, ship.size);
      }
    });
    setNumberOfShips(shipId);
  };

  return (
    <DataContext.Provider
      value={{
        levels,
        levelSelected,
        scores,
        sea,
        numberOfShips,
        setLevelSelected,
        setSea,
        putAllShips,
        addScore,
        cleanSea,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider };
export default DataContext;
