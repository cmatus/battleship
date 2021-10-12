import ButtonHome from "../ButtonHome";
import "./styles.scss";

const Instructions = () => {
  return (
    <div className="instructions">
      <div className="instructions-title">Battleship</div>
      <div className="instructions-text">
        The objective of Battleship is to try to sink all of the other player's
        ships. All of the other player's ships are somewhere on your board. Try
        to hit them by calling the coordinates by clicking with the mouse on
        squares on the board. You can't see the other's board, so you have to
        try to guess where they are.
      </div>
      <ButtonHome />
    </div>
  );
};

export default Instructions;
