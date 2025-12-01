// KnightChessboard.js
import { useState } from "react";
import "./styles.css";

const BOARD_SIZE = 8;

const KnightChessboard = () => {
  const [hovered, setHovered] = useState(null);

  const isKnightMoveCell = (fromRow, fromCol, toRow, toCol) => {
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);

    // Knight moves: L shape (2,1) or (1,2)
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  };
  return (
    <div className="chessboard-grid">
      {Array.from({ length: BOARD_SIZE }).map((_, row) =>
        Array.from({ length: BOARD_SIZE }).map((_, col) => {
          const isLight = (row + col) % 2 === 0;
          const isHovered = hovered && hovered[0] === row && hovered[1] === col;
          const isRookMove =
            hovered && isKnightMoveCell(row, col, hovered[0], hovered[1]);
          const cellClasses = `cell ${
            isLight ? "light-square" : "dark-square"
          } ${
            isHovered
              ? "selected-square"
              : isRookMove
              ? "knight-move-target"
              : ""
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
            ></div>
          );
        })
      )}
    </div>
  );
};

export default KnightChessboard;
