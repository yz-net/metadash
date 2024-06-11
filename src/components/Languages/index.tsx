import React from "react";
import { arrayToObject } from "~/utils/common";
import CountListWithBars from "../CountListWithBars";
import Card from "../Card";

import "./main.scss";

export default function Languages(props) {
  const listProps = {
    ...props,
    handleItemClick: (item) => {
      // switch to item, or clear selections if you click on the selected item
      if (props.selections.length === 0 || item.id !== props.selections[0].id) {
        props.updateSelections([item]);
      } else {
        props.updateSelections([]);
      }
    },
    showAll: true,
    selections: arrayToObject(props.selections),
    showBars: true,
  };

  return (
    <Card title="Languages">
      <CountListWithBars {...listProps} />
    </Card>
  );
}