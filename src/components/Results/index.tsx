"use client";

import { useEffect, useRef, useState } from "react";
import "./main.scss";
import { getRecordingYear } from "~/utils/data";
import ResultList from "../ResultList";
// import {ResultList} from "@bit/jakekara.metadash.fortunoff-app"

export default function Results(props) {
  const [options, setOptions] = useState({
    limit: 1,
    increment: 1,
  });

  const resultsRef = useRef(null);

  useEffect(() => {
    const trackScrolling = () => {
      const scrollBottom = window.pageYOffset + window.innerHeight;
      const distanceFromBottom =
        window.document.body.offsetHeight - scrollBottom;
      if (props.results.length > options.limit && distanceFromBottom < 100) {
        setOptions((prev) => ({
          limit: options.limit + options.increment,
          increment: prev.increment,
        }));
      }
    };
    document.addEventListener("scroll", trackScrolling);
    return () => document.removeEventListener("scroll", trackScrolling);
  }, []);

  const renderResult = (result, i) => {
    return (
      <a target="_blank" rel="noopener noreferrer" href={result.link} key={i}>
        <div className="result-item-container">
          <div
            className={`result-item ${result.birth_years.length > 1 ? "multiple" : ""}`}
          >
            <div className="testimony-name">{result.title}</div>

            <div className="birth-year">
              {
                result.birth_years
                  .filter((yr) => yr)
                  .map((yr) => (
                    <li className="sub-item" key={`by-${i}`}>
                      {yr}
                    </li>
                  ))
                  .concat(
                    result.birth_place_cities
                      .filter(
                        (_, i) =>
                          result.birth_place_cities[i] ||
                          result.birth_place_countries[i],
                      )
                      .map((city, i) => (
                        <li className="sub-item" key={`bp-${i}`}>
                          {city}
                          {city && result.birth_place_countries[i] ? ", " : ""}
                          {result.birth_place_countries[i]}
                        </li>
                      )),
                  )
                  .slice(-2) // don't show more than two items
              }
            </div>
            <div className="affiliate">
              {result.programs.map((ref, i) => (
                <li className="sub-item" key={i}>
                  {props.programs[ref].label}
                </li>
              ))}
            </div>
            <div className="recording-year">{getRecordingYear(result)}</div>

            <div className="big-button-container">
              <div className="big-button">View</div>
            </div>
          </div>
        </div>
      </a>
    );
  };

  return (
    <div className="Results">
      <div className="prose">
        There are{" "}
        <span className="stat">{props.results?.length.toLocaleString()}</span>{" "}
        testimonies with matching criteria.
      </div>
      <div className="headers">
        <div className="testimony-name">Testimony title</div>
        <div className="birth-year">Birth year / place</div>
        <div className="affiliate">Affiliate</div>
        <div className="recording-year">Recording year</div>

        <div className="big-button-container">&nbsp;</div>
      </div>
      <div ref={resultsRef} className="results-container"></div>
      <ResultList
        items={props.results?.slice(0, options.limit).map(renderResult)}
      />
    </div>
  );
}
