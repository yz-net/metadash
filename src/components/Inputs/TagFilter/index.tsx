"use client";

import { useState } from "react";
import TextInput from "../TextInput";
import SelectionPool from "../SelectionPool";
import TagPool from "./TagPool";
import "./main.scss";

export default function TagFilter(props) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const updateSelections = (newSelections) => {
    props.updateSelections(newSelections);
    setSearchTerm("");
  };

  const addSelection = (selectionItem) => {
    // don't add a duplicate
    var newSelections = [...props.selections];
    if (newSelections.filter((a) => a.id === selectionItem.id).length > 0) {
      return;
    }

    newSelections = [...newSelections, selectionItem];

    updateSelections(newSelections, searchTerm);
  };

  const dropSelectionByID = (dropID) => {
    var newSelections = [...props.selections];
    newSelections = newSelections.filter((a) => {
      const ret = String(a.id) !== String(dropID);
      return ret;
    });

    updateSelections(newSelections, searchTerm);
  };

  const dropSelection = (item) => {
    dropSelectionByID(item.id);
  };

  const items = props
    .filterItems(searchTerm.split(" "))
    .filter((i) => i.id in props.allItems);

  return (
    <div className="TagFilter">
      <div className="top-area">
        <div className="type-area">
          <div className="title-area">{props.title}</div>
          <TextInput
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={props.placeholder}
            value={searchTerm}
          ></TextInput>
        </div>
        <SelectionPool onChange={dropSelection} items={props.selections} />
      </div>

      <TagPool onChange={addSelection} items={items || []} />
    </div>
  );
}
