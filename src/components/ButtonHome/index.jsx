import { useContext } from "react";
import { useHistory } from "react-router-dom";

import DataContext from "../../context/DataContext";

import "./styles.scss";

const ButtonHome = () => {
  const history = useHistory();

  const { cleanSea } = useContext(DataContext);

  const handleClick = () => {
    history.push("/");
    cleanSea();
  };

  return (
    <div className="button-home">
      <button className="shadow" onClick={handleClick}>
        <i className="fas fa-home"></i>
      </button>
    </div>
  );
};

export default ButtonHome;
