import React, { useState } from "react";
import "./styles.css";

function TreeNode({
  node,
  selectedIds,
  toggleCheckbox,
  toggleFolder,
  expandedIds,
}) {
  const isFolder = node.type === "folder";
  const isExpanded = expandedIds.has(node.id);

  return (
    <div className={`node ${node.type}`} data-testid={`node-${node.id}`}>
      <div className="node-content">
        {isFolder && (
          <button
            onClick={() => toggleFolder(node.id)}
            data-testid={`toggle-${node.id}`}
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        )}
        <input
          type="checkbox"
          checked={selectedIds.has(node.id)}
          onChange={() => toggleCheckbox(node, !selectedIds.has(node.id))}
          data-testid={`checkbox-${node.id}`}
        />
        <span>{node.name}</span>
      </div>
      {isFolder && isExpanded && node.children && (
        <div className="children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedIds={selectedIds}
              toggleCheckbox={toggleCheckbox}
              toggleFolder={toggleFolder}
              expandedIds={expandedIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TreeNavigation({ tree }) {
  // State for selectedIds and expandedIds
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [expandedIds, setExpandedIds] = useState(new Set(["1"])); // Root expanded by default

  // Placeholder: Implement toggleFolder logic
  const toggleFolder = (id) => {
    // TODO: Implement folder expansion/collapse logic
    // Example: setExpandedIds((prev) => {...})
    setExpandedIds((prev) => {
      const updatedExpandedIds = new Set(prev);
      if (updatedExpandedIds.has(id)) {
        updatedExpandedIds.delete(id);
      } else {
        updatedExpandedIds.add(id);
      }
      return updatedExpandedIds;
    });
  };

  // Placeholder: Implement toggleCheckbox logic
  const toggleCheckbox = (node, checked) => {
    // TODO: Implement checkbox toggle logic
    // Example: setSelectedIds((prev) => {...})

    const updatedSelectedIds = new Set(selectedIds);

    const traverseTopToBottom = (node, checked) => {
      //   console.log(node);
      if (checked) {
        updatedSelectedIds.add(node.id);
      } else {
        updatedSelectedIds.delete(node.id);
      }
      if (node.type === "folder" && node.children) {
        node.children.forEach((childNode) =>
          traverseTopToBottom(childNode, checked)
        );
      }
    };
    traverseTopToBottom(node, checked);

    const traverseBottomToTop = (node, idList) => {
      if (node.type !== "folder" || !node.children) {
        return idList.has(node.id);
      }

      let allChildrenSelected = true;

      node?.children?.forEach((childNode) => {
        const childSelected = traverseBottomToTop(childNode, idList);
        if (!childSelected) {
          allChildrenSelected = false;
        }
      });

      if (allChildrenSelected) {
        idList.add(node.id);
        return true;
      } else {
        idList.delete(node.id);
        return false;
      }
    };

    tree?.forEach((node) => traverseBottomToTop(node, updatedSelectedIds));
    setSelectedIds(updatedSelectedIds);
  };

  return (
    <div className="tree-container" data-testid="tree-container">
      <h1>Folder Navigation</h1>
      {tree?.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          selectedIds={selectedIds}
          toggleCheckbox={toggleCheckbox}
          toggleFolder={toggleFolder}
          expandedIds={expandedIds}
        />
      ))}
    </div>
  );
}

export default TreeNavigation;
