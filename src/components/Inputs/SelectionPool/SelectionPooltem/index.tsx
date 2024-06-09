import "./main.scss";

export default function SelectionPoolItem(props) {
  return (
    <div onClick={props.onClick} className="SelectionPoolItem">
      <div>{props.item.label}</div>
      <div className="button"></div>
    </div>
  );
}
