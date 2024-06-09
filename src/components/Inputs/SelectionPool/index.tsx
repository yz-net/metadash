import SelectionPoolItem from "./SelectionPooltem";
import "./main.scss";

export default function SelectionPool(props) {
  return (
    <div className="SelectionPool">
      {(props.items || []).map((item, i) => {
        return (
          <SelectionPoolItem key={i} onClick={props.callback} item={item} />
        );
      })}
    </div>
  );
}
