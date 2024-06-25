"use client";

import { useEffect, useState } from "react";

import CountListWithBars from "../CountListWithBars";
import TextInput from "../Inputs/TextInput";
import Card from "../Card";
import { objectToArray } from "~/utils/common";

export default function Interviewers(props: any /* TODO */) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectionsArray, setSelectionsArray] = useState<any[]>(
    objectToArray(props.selections),
  );

  // 6-3-19 - updated to expect an array and a dictionary to prevent
  // the need to use arrayToObject(dict+arr+interviewers)
  const [items, itemDict] = props.filterItems(searchTerm);

  useEffect(() => {
    setSelectionsArray(objectToArray(props.selections));
  }, [props.selections]);

  const updateSelections = (interviewers: any) => {
    setSearchTerm("");
    props.updateSelections(interviewers);
  };

  const handleItemClick = (item: any) => {
    // if you click an item that's already selected, unselect it.
    // otherwise, select it
    const selectionsWithoutCurrentItem = props.selections.filter(
      (i: any) => i.id !== item.id,
    );

    updateSelections(
      selectionsArray.some((s) => s.id === item.id)
        ? selectionsWithoutCurrentItem
        : selectionsWithoutCurrentItem.concat([item]),
    );
  };

  return (
    <Card className={props.className} title="Interviewers">
      <div className="input-wrapper">
        <TextInput
          placeholder="Search by name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          value={searchTerm}
        />
      </div>
      <CountListWithBars
        showBars={props.showBars}
        updateSelections={setSearchTerm}
        items={items}
        allItems={props.allInterviewers}
        showAll={false}
        itemDict={itemDict}
        handleItemClick={handleItemClick}
        selections={selectionsArray}
      />
    </Card>
  );
}
