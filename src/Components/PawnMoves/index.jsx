import { useState } from "react";
import "./styles.css";

const boardSize = 8;

export default function PawnBoard() {
  const [hovered, setHovered] = useState(null);

  const isPawnMoveCell = (fromRow, fromCol, toRow, toCol) => {
    if (fromRow === 0 || fromRow === 7) return false;

    if (fromRow === 6) {
      return (
        (toRow === fromRow - 1 || toRow === fromRow - 2) && fromCol === toCol
      );
    }
    return toRow === fromRow - 1 && fromCol === toCol;
  };

  return (
    <div className="board">
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => {
          const isHovered = hovered && hovered[0] === row && hovered[1] === col;
          const isPawnMove =
            hovered && isPawnMoveCell(hovered[0], hovered[1], row, col);
          const isLight = (row + col) % 2 === 0;
          const cellClasses = `cell ${isLight ? "light" : "dark"} ${
            isHovered ? "hovered" : ""
          } ${isPawnMove ? "pawn-move" : ""}`;
          return (
            <div
              key={`${row}-${col}`}
              role="gridcell"
              data-testid={`cell-${row}-${col}`}
              className={cellClasses}
              onMouseEnter={() => setHovered([row, col])}
              onMouseLeave={() => setHovered(null)}
              data-row={row}
              data-col={col}
            >
              {isHovered && <span className="pawn-icon">♙</span>}
            </div>
          );
        })
      )}
    </div>
  );
}
