import { useEffect, useRef, useState } from "react";
import "./styles.css";

const TOTAL = 9;
const GRID_SIZE = 3;

//recursion is better since it will not create timers all at once unlike loop

export default function GridLights() {
  const [activeCells, setActiveCells] = useState(new Set());
  const [activationOrder, setActivationOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const timerRefs = useRef([]);

  useEffect(() => {
    return () => {
      timerRefs.current.forEach(clearTimeout);
      timerRefs.current = [];
    };
  }, []);

  const handleClick = (index) => {
    // TODO: Implement click logic
    if (isDeactivating || activeCells.has(index)) return;

    const updatedActiveCells = new Set(activeCells);
    updatedActiveCells.add(index);
    const updatedOrder = [...activationOrder, index];
    setActiveCells(updatedActiveCells);
    setActivationOrder(updatedOrder);

    if (updatedOrder.length === TOTAL) {
      startReverseDeactivation(updatedOrder);
    }
  };

  const startReverseDeactivation = (order) => {
    // TODO: Implement reverse deactivation
    const reverseOrder = [...order].reverse();
    setIsDeactivating(true);

    reverseOrder.forEach((cellIndex, index) => {
      const timerId = setTimeout(() => {
        setActiveCells((prev) => {
          const newSet = new Set(prev);
          newSet.delete(cellIndex);
          return newSet;
        });
        if (index === reverseOrder.length - 1) {
          setIsDeactivating(false);
          setActivationOrder([]);
        }
      }, 300 * (index + 1));
      timerRefs.current.push(timerId);
    });
  };

  const resetGrid = () => {
    // TODO: Implement reset logic
    timerRefs.current.forEach(clearTimeout);
    setActiveCells(new Set());
    setActivationOrder([]);
    setIsDeactivating(false);
  };

  return (
    <div className="main-container">
      <h1 className="grid-title">Grid Lights</h1>

      <div className="button-section">
        <button onClick={resetGrid} data-testid="reset-btn">
          Reset Grid
        </button>
      </div>

      <div className="cinema-hall" data-testid="grid-lights">
        {Array.from({ length: GRID_SIZE }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: GRID_SIZE }, (_, colIdx) => {
              const index = rowIdx * GRID_SIZE + colIdx;
              return (
                <div
                  key={index}
                  className={`cell col ${
                    activeCells.has(index) ? "active" : ""
                  }`}
                  onClick={() => handleClick(index)}
                  data-testid={`cell-${index}`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
