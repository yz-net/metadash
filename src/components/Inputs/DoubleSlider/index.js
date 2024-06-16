import { useEffect, useState } from "react";

// TODO https://codesandbox.io/p/sandbox/multi-range-slider-react-ts-b9l0g?file=%2Fsrc%2Findex.tsx

export default function DoubleSlider(props) {
  const [values, setValues] = useState([props.min, props.max]);

  useEffect(() => {
    if (!props.selections) {
      return;
    }
    setValues(props.selections);
  }, [props.selections]);

  useEffect(() => {
    console.log("OAWKDKOAWD", values);
    // props.updateSelections(values);
  }, [values]);

  return (
    <div>
      <label>{props.label}</label>
      <div className="flex flex-col">
        <input
          type="range"
          min={props.min}
          max={props.max}
          onChange={(e) =>
            setValues((prev) => [
              Math.min(Number(e.target.value), prev[1]),
              prev[1],
            ])
          }
          value={values[0]}
        />
        <label>{values[0]}</label>
      </div>

      <div className="flex flex-col">
        <input
          type="range"
          min={props.min}
          max={props.max}
          onChange={(e) =>
            setValues((prev) => [
              prev[0],
              Math.max(Number(e.target.value), prev[0]),
            ])
          }
          value={values[1]}
        />
        <label>{values[1]}</label>
      </div>
    </div>
  );
}
