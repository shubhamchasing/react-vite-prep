import "./styles.css"
import { useToggle } from "./useToggle";


export default function Toggle() {
  // ✅ Use the custom hook inside this component
  const [isOn, toggle] = useToggle(false);

  return (
    /* your toggle function for the onClick method */
    <button data-testid="toggle-button" onClick={toggle}>
      {/* Render "ON" or "OFF" based on state */}
      {isOn ? "ON" : "OFF"}
    </button>
  );
}
