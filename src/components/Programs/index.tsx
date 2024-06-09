"use client";

import { useEffect, useState } from "react";
import { objectToArray } from "~/utils/common";
import ItemSelector from "../Inputs/ItemSelector";
import HoverText from "../Inputs/HoverText";

import "./main.scss";
import { ResponsiveTreeMap } from "@nivo/treemap";
import TreeMap from "../Viz/TreeMap";

const CustomNode = ({ node, onMouseEnter, onMouseLeave, onClick }: any) => {
  return (
    <g
      className="group"
      transform={`translate(${node.x},${node.y})`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <rect
        className="fill-[#8ec8cc] group-hover:fill-[#0d99aa]"
        width={node.width}
        height={node.height}
      />
    </g>
  );
};

export default function Programs(props) {
  const [hoverText, setHoverText] = useState<string>(" ");
  const [data, setData] = useState<
    { id: string; label: string; count: number }[]
  >([]);

  useEffect(() => {
    setData(objectToArray(props.programs));
  }, [props.programs]);

  const label = () => {
    if (!props.selections || props.selections.length < 1) {
      return "";
    }
    return props.selections[0].label;
  };

  const handleMouseEnter = (item) => {
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

  const handleMouseLeave = () => {
    setHoverText(" ");
  };

  return (
    <div className="Programs module-box">
      <h3 className="title">Affiliate programs</h3>

      <TreeMap
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

      <ItemSelector
        updateSelections={props.updateSelections}
        items={objectToArray(props.programs)}
        selections={props.selections}
        placeholder={"All affiliate programs"}
      />
    </div>
  );
}
