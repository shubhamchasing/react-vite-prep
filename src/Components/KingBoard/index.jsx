import { useState } from "react";
import "./styles.css";

const boardSize = 8;

function King() {
  const [hovered, setHovered] = useState(null);

  const isKingMoveCell = (fromRow, fromCol, toRow, toCol) => {
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);

    // King moves one step in any direction
    return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const isHovered = hovered && hovered[0] === row && hovered[1] === col;
        const isKingMove =
          hovered && isKingMoveCell(hovered[0], hovered[1], row, col);
        const isLight = (row + col) % 2 === 0;
        let cellClasses = `cell ${isLight ? "light" : "dark"} ${
          isHovered ? "hovered" : ""
        } ${isKingMove ? "king-move" : ""}`;

        board.push(
          <div
            key={`${row}-${col}`}
            data-testid={`cell-${row}-${col}`}
            className={cellClasses}
            onMouseEnter={() => setHovered([row, col])}
            onMouseLeave={() => setHovered(null)}
            role="gridcell"
            data-row={row}
            data-col={col}
          >
            {isHovered && <span className="king-icon">♔</span>}
          </div>
        );
      }
    }
    return board;
  };

  return <div className="board">{renderBoard()}</div>;
}

export default King;
