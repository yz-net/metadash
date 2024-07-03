"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { objectToArray } from "~/utils/common";
import ItemSelector from "../ItemSelector";
import HoverText from "../HoverText";
import TreeMap from "../Viz/TreeMap";
import Card from "../Card";

export default function Programs(props: any) {
  const [hoverText, setHoverText] = useState<string>(" ");

  const label = () => {
    if (!props.selections || props.selections.length < 1) {
      return "";
    }
    return props.selections[0].label;
  };

  const handleMouseEnter = (item: any) => {
    setHoverText(item.label);
  };

  const handleClick = (item: any) => {
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

  const handleMouseLeave = () => {
    setHoverText(" ");
  };

  return (
    <Card
      className={twMerge("flex flex-col", props.className)}
      title="Affiliate programs"
    >
      <TreeMap
        height={380}
        items={objectToArray(props.programs)}
        itemDict={props.programs}
        mouseInCallback={handleMouseEnter}
        mouseOutCallback={handleMouseLeave}
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
      <div className="flex flex-1 items-end">
        <ItemSelector
          updateSelections={props.updateSelections}
          items={objectToArray(props.programs)}
          selections={props.selections}
          placeholder="All affiliate programs"
        />
      </div>
    </Card>
  );
}
