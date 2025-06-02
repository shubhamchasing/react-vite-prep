import { useState } from "react";
import "./styles.css";

function Tabs({ tabs = [] }) {
  const [tabId, setTabId] = useState(0);

  const handleTabChange = (id) => {
    setTabId(id);
  };

  if (tabs.length === 0) {
    return <div>No tabs available</div>;
  }
 
  return (
    <div className="container">
      <div className="tab-container">
        {tabs?.map((tab, index) => {
          return (
            <div
              className="tab"
              key={index}
              onClick={() => handleTabChange(index)}
              style={{
                borderBottom: index === tabId ? "4px solid blue" : "none",
              }}
            >
              {tab?.title || `Tab ${index + 1}`}
            </div>
          );
        })}
      </div>
      <div className="tab-content">
        {" "}
        {tabs[tabId]?.content || "No content available"}
      </div>
    </div>
  );
}

function TabsParent() {
  const tabsData = [
    { title: "Tab 1", content: "This is the content of Tab 1" },
    { title: "Tab 2", content: "This is the content of Tab 2" },
    { title: "Tab 3", content: "This is the content of Tab 3" },
  ];

  return <Tabs tabs={tabsData} />;
}

export default TabsParent;
