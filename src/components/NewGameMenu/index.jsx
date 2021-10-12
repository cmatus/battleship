import { useContext } from "react";
import { useHistory } from "react-router-dom";

import DataContext from "../../context/DataContext";
import ButtonHome from "../ButtonHome";

import "../../styles/app.scss";
import "./styles.scss";

const NewGameMenu = () => {
  const history = useHistory();

  const { levels, setLevelSelected, putAllShips } = useContext(DataContext);

  const handleSelectLevel = (level) => {
    setLevelSelected(level);
    putAllShips();
    history.push("/game");
  };

  return (
    <div className="menu">
      {levels.map((level) => (
        <div
          key={level.id}
          className={`menu-item level-${level.id} shadow`}
          onClick={() => handleSelectLevel(level)}
        >
          {level.name} &nbsp;
          <span>
            ({level.attempts < 0 ? "infinite" : level.attempts} attempts)
          </span>
        </div>
      ))}
      <ButtonHome />
    </div>
  );
};

export default NewGameMenu;
