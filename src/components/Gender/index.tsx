"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import Card from "../Card";

export default function Gender(props: any /* TODO */) {
  const [filter, setFilter] = useState({
    men: true,
    women: true,
    multiple: true,
  });

  const menRef = useRef(null);
  const womenRef = useRef(null);
  const multipleRef = useRef(null);

  useEffect(() => {
    const selections = [];
    if (filter.men) {
      selections.push("men");
    }
    if (filter.women) {
      selections.push("women");
    }
    if (filter.multiple) {
      selections.push("multiple");
    }
    animateBars();
    props.updateSelections(selections);
  }, [filter]);

  const animateBars = () => {
    const vals = {
        men: props.men || 0,
        women: props.women || 0,
        multiple: props.multiple || 0,
      },
      total = vals.men + vals.women + vals.multiple;

    const animate = (
      key: "men" | "women" | "multiple",
      ref: MutableRefObject<null>,
    ) => {
      d3.select(ref?.current)
        .transition()
        .duration(1000)
        .ease(d3.easeSinOut)
        .style("width", () => (vals[key] * 100) / total + "%");
    };

    animate("multiple", multipleRef);
    animate("men", menRef);
    animate("women", womenRef);
  };

  const genderToggle = (gender: "men" | "women" | "multiple") => {
    setFilter({
      men: gender === "men" ? !filter.men : filter.men,
      women: gender === "women" ? !filter.women : filter.women,
      multiple: gender === "multiple" ? filter.multiple : filter.multiple,
    });
  };

  const total: number = props.men + props.women + props.multiple;

  return (
    <Card title="Gender">
      <div className="flex justify-between">
        <label className="color-[#222] font-yalenewroman text-2xl">{`${((props.men * 100) / total).toFixed(0)}%`}</label>
        <label className="color-[#222] font-yalenewroman text-2xl">{`${((props.multiple * 100) / total).toFixed(0)}%`}</label>
        <label className="color-[#222] font-yalenewroman text-2xl">{`${((props.women * 100) / total).toFixed(0)}%`}</label>
      </div>
      <div className="flex w-full justify-between bg-[#d3d3d3]">
        <button
          className="h-5 border-r border-r-white bg-[#0d99aa]"
          ref={menRef}
          type="button"
          onClick={() => genderToggle("men")}
        />
        <button
          className="h-5 border-r border-r-white bg-[#f9be00]"
          ref={multipleRef}
          type="button"
          onClick={() => genderToggle("multiple")}
        />
        <button
          className="h-5 border-r border-r-white bg-[#ca6251]"
          ref={womenRef}
          type="button"
          onClick={() => genderToggle("women")}
        />
      </div>
      <div className="mt-3 flex justify-between">
        <button
          className="flex flex-col items-start justify-center font-sans"
          type="button"
          onClick={() => genderToggle("men")}
        >
          <div className="font-bold">Men</div>
          <div className="text-[#6e6e6e]">{props.men.toLocaleString()}</div>
        </button>
        <button
          className="flex flex-col items-center justify-center font-sans"
          type="button"
          onClick={() => genderToggle("multiple")}
        >
          <div className="font-bold">Multiple</div>
          <div className="text-[#6e6e6e]">
            {props.multiple?.toLocaleString()}
          </div>
        </button>

        <button
          className="flex flex-col items-end justify-center font-sans"
          type="button"
          onClick={() => genderToggle("women")}
        >
          <div className="font-bold">Women</div>
          <div className="text-[#6e6e6e]">{props.women.toLocaleString()}</div>
        </button>
      </div>
    </Card>
  );
}
