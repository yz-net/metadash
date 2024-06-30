import { FiX } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

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
  const subClass = selected.id === "ALL" ? "arrow" : "x";
  let buttonClass = "clear-button";
  buttonClass = "dropdown-icon " + subClass;

  if (selected.id !== "ALL") {
    buttonClass += " enabled";
  }
  return (
    <div className="flex h-9 flex-1 items-stretch border border-[#d3d3d3] bg-[#f5f5f5] font-yalenewroman text-[#222]">
      <select
        className={subClass + " h-full w-full bg-transparent px-2"}
        defaultValue={selected.ID}
        onChange={handleSelection}
      >
        <option onClick={clearSelection} value="all">
          {props.placeholder || "All items"}
        </option>

        {props.items.map((item: any, index: number) => {
          const optionProps = {
            value: item.id,
          };
          return (
            <option key={index} {...optionProps}>
              {item.label}
            </option>
          );
        })}
      </select>

      <button
        className={twMerge(
          "h-full w-8",
          selected.id === "ALL" ? "hidden" : "block",
        )}
        onClick={clearSelection}
        type="button"
      >
        <FiX className="stroke-[#222]" />
      </button>
    </div>
  );
}
