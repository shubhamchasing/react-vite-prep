import { useState } from "react";
import "./style.css";

// Sample tab data
const tabs = [
  { id: "home", label: "Home", content: "Welcome to the Home tab!" },
  { id: "profile", label: "Profile", content: "This is your Profile." },
  { id: "settings", label: "Settings", content: "Adjust your Settings here." },
];

export default function TabSwitcher() {
  // TODO: Set up state to track the active tab

  const [activeTab, setActiveTab] = useState("home");

  const handleTabSwtich = (id) => {
    // console.log(e.target.dataset.testid);
    setActiveTab(id);
  };

  return (
    <div className="tab-switcher">
      <h1>Tab Switcher</h1>

      {/* Tab buttons */}
      <div className="tab-buttons">
        {/* TODO: Render buttons for each tab */}
        {/* Use data-testid={`tab-button-${tab.id}`} for each button */}
        {tabs.map((tab) => (
          <button
            className={`${activeTab === tab.id && "active"}`}
            key={tab.id}
            data-testid={`tab-button-${tab.id}`}
            onClick={() =>  {handleTabSwtich(tab.id)}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="tab-content" data-testid="tab-content">
        {/* TODO: Show content of the currently active tab */}
        {tabs.find((tab) => tab.id === activeTab).content}
      </div>
    </div>
  );
}
