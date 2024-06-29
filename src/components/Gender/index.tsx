"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import Card from "../Card";
import { twMerge } from "tailwind-merge";

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
    props.updateSelections(selections);
  }, [filter]);

  useEffect(() => {
    animateBars();
  }, [props.men, props.multiple, props.women]);

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
    setFilter((prev) => {
      let newFilter = {
        men: gender === "men" ? !filter.men : filter.men,
        women: gender === "women" ? !filter.women : filter.women,
        multiple: gender === "multiple" ? !filter.multiple : filter.multiple,
      };
      if (!newFilter.men && !newFilter.women && !newFilter.multiple) {
        newFilter = prev;
      }
      return newFilter;
    });
  };

  const total: number = props.men + props.women + props.multiple;

  return (
    <Card className={props.className} title="Gender">
      <div className="flex justify-between">
        <button
          className="font-yalenewroman text-2xl text-[#222] hover:text-[#333]"
          type="button"
          onClick={() => genderToggle("men")}
        >{`${((props.men * 100) / total).toFixed(0)}%`}</button>
        <button
          className="font-yalenewroman text-2xl text-[#222] hover:text-[#333]"
          type="button"
          onClick={() => genderToggle("multiple")}
        >{`${((props.multiple * 100) / total).toFixed(0)}%`}</button>
        <button
          className="font-yalenewroman text-2xl text-[#222] hover:text-[#333]"
          type="button"
          onClick={() => genderToggle("women")}
        >{`${((props.women * 100) / total).toFixed(0)}%`}</button>
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
          className="group flex flex-col items-start justify-center font-sans"
          type="button"
          onClick={() => genderToggle("men")}
        >
          <div
            className={twMerge(
              "font-bold group-hover:text-[#8ec8cc]",
              filter.men ? "" : "text-gray-400",
            )}
          >
            Men
          </div>
          <div
            className={twMerge(
              "text-[#6e6e6e] group-hover:text-[#8ec8cc]",
              filter.men ? "" : "text-gray-400",
            )}
            suppressHydrationWarning
          >
            {props.men.toLocaleString()}
          </div>
        </button>
        <button
          className="group flex flex-col items-center justify-center font-sans"
          type="button"
          onClick={() => genderToggle("multiple")}
        >
          <div
            className={twMerge(
              "font-bold group-hover:text-[#8ec8cc]",
              filter.multiple ? "" : "text-gray-400",
            )}
          >
            Multiple
          </div>
          <div
            className={twMerge(
              "text-[#6e6e6e] group-hover:text-[#8ec8cc]",
              filter.multiple ? "" : "text-gray-400",
            )}
            suppressHydrationWarning
          >
            {props.multiple.toLocaleString()}
          </div>
        </button>

        <button
          className="group flex flex-col items-end justify-center font-sans hover:text-[#8ec8cc]"
          type="button"
          onClick={() => genderToggle("women")}
        >
          <div
            className={twMerge(
              "font-bold group-hover:text-[#8ec8cc]",
              filter.women ? "" : "text-gray-400",
            )}
          >
            Women
          </div>
          <div
            className={twMerge(
              "text-[#6e6e6e] group-hover:text-[#8ec8cc]",
              filter.women ? "" : "text-gray-400",
            )}
            suppressHydrationWarning
          >
            {props.women.toLocaleString()}
          </div>
        </button>
      </div>
    </Card>
  );
}
