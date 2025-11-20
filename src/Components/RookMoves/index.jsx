import { useState } from "react";
import "./styles.css";

const boardSize = 8;

export default function RookChessboard() {
  const [hovered, setHovered] = useState(null);

  const isRookMoveCell = (fromRow, fromCol, toRow, toCol) => {
    return fromRow === toRow || fromCol === toCol;
  };

  return (
    <div className="board">
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => {
          const isLight = (row + col) % 2 === 0;
          const isHovered = hovered && hovered[0] === row && hovered[1] === col;
          const isRookMove =
            hovered && isRookMoveCell(row, col, hovered[0], hovered[1]);
          const cellClasses = `cell ${isLight ? "light" : "dark"} ${
            isHovered ? "hovered" : isRookMove ? "rook-move" : ""
          }`;
          return (
            <div
              key={`${row}-${col}`}
              className={cellClasses}
              data-testid={`cell-${row}-${col}`}
              role="gridcell"
              onMouseEnter={() => setHovered([row, col])}
              onMouseLeave={() => setHovered(null)}
              data-row={row}
              data-col={col}
            >
              {isHovered && <span className="rook-icon">♜</span>}
            </div>
          );
        })
      )}
    </div>
  );
}
