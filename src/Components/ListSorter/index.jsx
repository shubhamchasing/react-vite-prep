import React from "react";
import ListSorter from "./LIstSorterChild";
import "./styles.css";

// Default list passed as prop
const defaultFruits = [
  "Banana",
  "Apple",
  "Cherry",
  "Mango",
  "Blueberry",
  "Kiwi",
  "Pineapple",
  "Fig",
];

export default function ListSorterParent() {
  return <ListSorter initialList={defaultFruits} />;
}
