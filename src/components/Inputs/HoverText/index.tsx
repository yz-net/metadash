import "./main.scss";

export default function HoverText(props) {
  let ret = null;

  if (!props.selections || props.selections.length < 1) {
    ret = (
      <div className="unselected-item">
        <div className="x-icon"></div>
        <div>{props.hoverText || " "}</div>
      </div>
    );
  } else {
    let htext =
      props.hoverText?.trim().length > 0 ? props.hoverText : props.label || " ";
    ret = (
      <div className="selected-item" onClick={props.dropCallback}>
        <div className="x-icon" />
        <div>{htext}</div>
      </div>
    );
  }

  return <div className="HoverText">{ret}</div>;
}
