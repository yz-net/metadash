export default function ItemSelector(props: any) {
  const handleSelection = (item: any) => {
    props.updateSelections(
      props.items.filter((i: any) => i.id === item.target.value),
    );
  };

  const clearSelection = () => {
    props.updateSelections([]);
  };

  const selected =
    props.selections && props.selections.length === 1
      ? props.selections[0]
      : { id: "ALL" };
  // const clearButtonText = selected.id === "ALL" ? "" : "╳"
  const subClass = selected.id === "ALL" ? "arrow" : "x";
  // const active = selected.id !== "ALL"
  let buttonClass = "clear-button";
  buttonClass = "dropdown-icon " + subClass;

  if (selected.id !== "ALL") {
    buttonClass += " enabled";
  }
  return (
    <div className="ItemSelector">
      <select
        className={subClass + " dropdown-icon"}
        defaultValue={selected.ID}
        onChange={handleSelection}
      >
        <option onClick={clearSelection} value="all">
          {props.placeholder || "All items"}
        </option>

        {props.items.map((item: any, index: number) => {
          const optionProps = {
            // selected: selected.id === item.id,
            value: item.id,
          };
          return (
            <option key={index} {...optionProps}>
              {item.label}
            </option>
          );
        })}
      </select>

      <div className={"button " + buttonClass} onClick={clearSelection}></div>
    </div>
  );
}
