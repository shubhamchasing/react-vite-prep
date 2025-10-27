import { useState } from "react";
import { colorNameToHex } from "./colorData";
import "./styles.css";

const ColorExplorer = () => {
  const [searchColor, setSearchColor] = useState("");
  const [color, setColor] = useState(null);
  const [colorNotFound, setColorNotFound] = useState("");

  const handleOnChange = (e) => {
    setSearchColor(e.target.value);
  };
  const handleSearchColor = () => {
    // const convertedStr = searchColor
    //   .split("")
    //   .filter((word) => word !== " ")
    //   .join("")
    //   .toLowerCase();
    // console.log(convertedStr);

    const convertedStr = searchColor.trim().toLowerCase();
    const hex = colorNameToHex(convertedStr);

    if (hex) {
      setColor({ name: convertedStr, hex });
      setColorNotFound("");
    } else {
      setColorNotFound("Sorry, I couldn't recognize that color.");
      setColor(null);
    }
  };

  return (
    <div className="container">
      <h1>Color Explorer</h1>
      <div className="input-section">
        <input
          type="text"
          data-testid="color-input"
          placeholder="Type a color name e.g. lavender"
          value={searchColor}
          onChange={handleOnChange}
        />
        <button data-testid="search-button" onClick={handleSearchColor}>
          🔍
        </button>
      </div>
      {colorNotFound && (
        <div className="error" data-testid="error-msg">
          {colorNotFound}
        </div>
      )}
      {color && (
        <div className="color-box" data-testid="color-box">
          <div
            className="preview"
            role="presentation"
            data-testid="color-preview"
            style={{ backgroundColor: `${color.hex}` }}
          ></div>
          <p data-testid="color-name">
            <strong>Name:</strong> {color.name}
          </p>
          <p data-testid="color-hex">
            <strong>Hex:</strong> {color.hex}
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorExplorer;
