import { useState } from "react";
import "./styles.css";

const boardSize = 8;

export default function BishopMoves() {
  const [hovered, setHovered] = useState(null);

  const isBishopMoveCell = (fromRow, fromCol, toRow, toCol) => {
    return Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol);
  };
  return (
    <div className="board">
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => {
          const isHovered = hovered && hovered[0] === row && hovered[1] === col;
          const isBishopMove =
            hovered && isBishopMoveCell(row, col, hovered[0], hovered[1]);
          const isLight = (row + col) % 2 === 0;
          return (
            <div
              key={`${row}-${col}`}
              role="gridcell"
              data-testid={`cell ${row}-${col}`}
              className={`cell ${isLight ? "light" : "dark"} ${
                isHovered ? "hovered" : isBishopMove ? "bishop-move" : ""
              }`}
              onMouseEnter={() => setHovered([row, col])}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })
      )}
    </div>
  );
}
