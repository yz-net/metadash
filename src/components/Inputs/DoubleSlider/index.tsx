import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

// TODO https://codesandbox.io/p/sandbox/multi-range-slider-react-ts-b9l0g?file=%2Fsrc%2Findex.tsx

export default function DoubleSlider(props) {
  const [values, setValues] = useState([props.min, props.max]);
  const range = useRef<HTMLDivElement>(null);

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
    <div className="mx-auto flex w-full max-w-[350px] flex-wrap">
      <label className="mr-1 flex w-full flex-1 items-center justify-end font-sans text-sm font-bold">
        {props.label}
      </label>
      <div className="flex items-center justify-center">
        <input
          className={twMerge(
            "thumb",
            values[0] > props.max - 100 ? "z-[5]" : "z-[3]",
          )}
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
        <input
          className="thumb z-[4]"
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
        <div className="slider">
          <div className="slider__track"></div>
          <div ref={range} className="slider__range"></div>
          <div className="slider__left-value">{values[0]}</div>
          <div className="slider__right-value">{values[1]}</div>
        </div>
      </div>
    </div>
  );
}
