import { useContext } from "react";
import { useHistory } from "react-router-dom";

import DataContext from "../../context/DataContext";

import "./styles.scss";

const ButtonPlayAgain = () => {
  const history = useHistory();

  const { cleanSea } = useContext(DataContext);

  const handleClick = () => {
    history.push("/newGame");
    cleanSea();
  };

  return (
    <div className="button-play-again">
      <button className="shadow" onClick={handleClick}>
        <i className="fas fa-redo-alt"></i>
      </button>
    </div>
  );
};

export default ButtonPlayAgain;
