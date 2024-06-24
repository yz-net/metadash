import SelectionPoolItem from "./SelectionPooltem";
import "./main.scss";

export default function SelectionPool(props) {
  return (
    <div className="overlfow-y-hidden flex max-h-20 flex-1 flex-nowrap overflow-x-auto px-8 py-5">
      {(props.items || []).map((item, i) => {
        return (
          <SelectionPoolItem key={i} onClick={props.callback} item={item} />
        );
      })}
    </div>
  );
}
