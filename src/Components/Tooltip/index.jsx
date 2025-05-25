import React, { Component } from "react";
import "./styles.css";

class Tooltip extends Component {
  constructor() {
    super();
    this.state = { hoverIcon: null };
  }

  handleMouseEnter = (label) => this.setState({ hoverIcon: label });

  handleMouseLeave = () => this.setState({ hoverIcon: null });

  render() {
    const icons = [
      { emoji: "🏠", label: "Home" },
      { emoji: "📧", label: "Email" },
      { emoji: "⚙️", label: "Settings" },
    ];

    return (
      <div className="tooltip-container">
        {icons.map((icon, index) => (
          <div key={index} className="tooltip-item">
            <>
              {this.state.hoverIcon === icon.label && (
                <div className="tooltip-box">{icon.label}</div>
              )}
            </>
            <span
              onMouseEnter={() => this.handleMouseEnter(icon.label)}
              onMouseLeave={this.handleMouseLeave}
            >
              {icon.emoji}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Tooltip;
