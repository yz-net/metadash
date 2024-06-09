"use client";

import { useEffect, useState } from "react";

import "./main.scss";
import Card from "../Card";

export default function Gender(props) {
  const [filter, setFilter] = useState({
    men: true,
    women: true,
    multiple: true,
  });

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
      <div className="label-container">
        <div className="big-label">{`${Math.round(props.men / total)}%`}</div>
        <div className="big-label">{`${Math.round(props.multiple / total)}%`}</div>
        <div className="big-label">{`${Math.round(props.women / total)}%`}</div>
      </div>
      <div className="split-bar-container">
        <div onClick={() => genderToggle("men")} className={`men gender-bar`} />
        <div
          onClick={() => genderToggle("multiple")}
          className={`multiple gender-bar`}
        />

        <div
          onClick={() => genderToggle("women")}
          className={`women gender-bar`}
        />
      </div>
      <div className="label-container">
        <div
          className={"label-area men small-label "}
          onClick={() => genderToggle("men")}
        >
          <div>Men</div>
          <div className="subtext">{props.men.toLocaleString()}</div>
        </div>
        <div
          className={"label-area multiple small-label "}
          onClick={() => genderToggle("multiple")}
        >
          <div>Multiple</div>
          <div className="subtext">{props.multiple?.toLocaleString()}</div>
        </div>

        <div
          onClick={() => genderToggle("women")}
          className={"label-area women small-label "}
        >
          <div>Women</div>
          <div className="subtext">{props.women.toLocaleString()}</div>
        </div>
      </div>
    </Card>
  );
}
