"use client";

import { useEffect, useState } from "react";
import CountListWithBars from "../CountListWithBars";
import TextInput from "../Inputs/TextInput";

export default function Interviewers(props) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dropSelection = (item) => {
    props.updateSelections(props.selections.filter((i) => i.id !== item.id));
  };

  useEffect(() => {
    if (searchTerm) {
      return;
    }
    props.updateSelections.apply(null, arguments);
  }, [searchTerm]);

  const handleItemClick = (item) => {
    // if you click an item that's already selected, unselect it.
    // otherwise, select it
    const selections = props.selectionsDict; //arrayToObject(props.selections);
    const selectionsWithoutCurrentItem = props.selections.filter(
      (i) => i.id !== item.id,
    );

    if (item.id in selections) {
      setSearchTerm(selectionsWithoutCurrentItem);
    } else {
      setSearchTerm(selectionsWithoutCurrentItem.concat([item]));
    }

    // updateSelections(props.selections.filter(i=>i.id !== item.id).concat([item]))
  };

  // 6-3-19 - updated to expect an array and a dictionary to prevent
  // the need to use arrayToObject(dict+arr+interviewers)
  const [items, itemDict] = props.filterItems(searchTerm);

  const listProps = {
    showBars: props.showBars,
    updateSelections: setSearchTerm,
    items, //: items,
    allItems: props.allInterviewers,
    showAll: false,
    itemDict, //: arrayToObject(items),
    handleItemClick: handleItemClick,
    selections: props.selectionsDict, //arrayToObject(props.selections)
    //allowMultipleSelections: true,
    // items: state.filteredItems
    // items: objectToArray(props.interviewers)
  };

  return (
    <div className="Interviewers module-box">
      <h3 className="title">Interviewers</h3>
      <div className="input-wrapper">
        <TextInput
          placeholder="Search by name"
          onChange={setSearchTerm}
          value={searchTerm}
        />
      </div>
      <CountListWithBars {...listProps} />
    </div>
  );
}
