import "./main.scss";

export default function TextInput(props) {
  return (
    <div className="TextInput">
      <input
        onChange={props.onChange}
        value={props.value ?? ""}
        placeholder={props.placeholder}
        type="text"
      ></input>
    </div>
  );
}
