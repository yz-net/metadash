import React from "react";

export default function ResultList(props: any) {
  return (
    <div>
      {props.items?.map((item: any, index: number) => (
        <div key={index} className="mb-4 rounded-lg bg-white">
          {item}
        </div>
      ))}
    </div>
  );
}
