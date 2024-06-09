import React from "react";
import "./main.scss";

export default function TagPoolItem(props) {
  return (
    <div
      onClick={() => props.onChange}
      data-value={props.item.value}
      className="TagItem"
    >
      {props.item.label}
    </div>
  );
}
