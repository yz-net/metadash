import React from "react";
import { arrayToObject } from "~/utils/common";
import CountListWithBars from "../CountListWithBars";
import Card from "../Card";

export default function Languages(props: any) {
  const listProps = {
    ...props,
    handleItemClick: (item: any) => {
      // switch to item, or clear selections if you click on the selected item
      if (props.selections.some((s: any) => s.id === item.id)) {
        props.updateSelections([
          ...props.selections.filter((s: any) => s.id !== item.id),
        ]);
      } else {
        props.updateSelections([...props.selections, item]);
      }
    },
    showAll: true,
    selections: arrayToObject(props.selections),
    showBars: true,
  };

  return (
    <Card className={props.className} title="Languages">
      <CountListWithBars {...listProps} />
    </Card>
  );
}
