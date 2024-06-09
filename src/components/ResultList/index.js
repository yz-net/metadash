import React from "react";
import wrapResultListItem from "./ResultListItem";
import "./main.scss";

export default function ResultList(props) {
  return (
    <div className="ResultList">
      {props.items?.map((item, idx) => wrapResultListItem(item, idx))}
    </div>
  );
}
