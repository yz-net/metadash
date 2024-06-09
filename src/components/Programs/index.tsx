"use client";

import React, { useState } from "react";
import "./main.scss";
import { objectToArray } from "~/utils/common";
import ItemSelector from "../Inputs/ItemSelector";
import HoverText from "../Inputs/HoverText";
import TreeMap from "../Viz/TreeMap";

export default function Programs(props) {
  const [hoverText, setHoverText] = useState<string>(" ");

  const label = () => {
    if (!props.selections || props.selections.length < 1) {
      return "";
    }
    return props.selections[0].label;
  };

  const handleMouseIn = (item) => {
    setHoverText(item.label);
  };

  const handleClick = (item) => {
    if (
      props.selections &&
      props.selections.length > 0 &&
      props.selections[0].id === item.id
    ) {
      props.updateSelections([]);
    } else {
      props.updateSelections([item]);
    }
  };

  const handleMouseOut = () => {
    setHoverText(" ");
  };

  return (
    <div className="Programs module-box">
      <h3 className="title">Affiliate programs</h3>

      <TreeMap
        items={objectToArray(props.programs)}
        itemDict={props.programs}
        mouseInCallback={handleMouseIn}
        mouseOutCallback={handleMouseOut}
        selections={props.selections}
        clickCallback={handleClick}
      />
      <HoverText
        selections={props.selections}
        hoverText={hoverText}
        dropCallback={() => {
          props.updateSelections([]);
        }}
        label={label()}
      />

      <ItemSelector
        updateSelections={props.updateSelections}
        items={objectToArray(props.programs)}
        selections={props.selections}
        placeholder={"All affiliate programs"}
      />
    </div>
  );
}
