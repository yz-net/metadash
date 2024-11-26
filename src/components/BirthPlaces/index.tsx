"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { objectToArray } from "~/utils/common";
import Cluster from "../Viz/Cluster";
import HoverText from "../HoverText";
import Card from "../Card";
import TextInput from "../TextInput";

export default function BirthPlaces(props: any) {
  const [hoverText, setHoverText] = useState("");
  const [suggestionValue, setSuggestionValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const autoSuggestRef = useRef<HTMLDivElement>(null);
  const suggestionRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const newShowSuggestions = suggestionValue.length > 0;
    setShowSuggestions(newShowSuggestions);

    if (!newShowSuggestions) {
      return;
    }

    let newSuggestions = cleanClusterData().map((d) => ({
      ...d,
      label: cleanPlaceName(d),
    }));
    newSuggestions.pop(); // remove structural entry required for d3 (see cleanClusterData() -> an item is pushed at the end)
    newSuggestions = newSuggestions.filter((s: any) =>
      s.label.toLowerCase().includes(suggestionValue.toLowerCase()),
    );
    setSuggestions(newSuggestions);
  }, [suggestionValue]);

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      if (
        autoSuggestRef.current &&
        !autoSuggestRef.current.contains(e.target as Node) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, []);

  const cleanPlaceName = (item: any) => {
    if (!item) {
      return "";
    }
    const city = item.label.split("|")[0].split(",")[0],
      country = item.country;

    if (city === country) {
      return country;
    }
    if (city && country) {
      return city + ", " + country;
    } else if (city) {
      return city;
    } else if (country) {
      return country;
    }
  };

  const cleanClusterData = () => {
    const addedCountries: any[] = [];

    const clusterData = objectToArray(props.allBirthPlaces)
      .filter(
        (place) =>
          place.label.split("|").filter((x: any) => x && x.length > 0)
            .length === 2,
      )
      .map((item) => {
        const ret = { ...item };
        if (!(item.id in props.birthPlaces)) {
          ret.count = 0;
        }

        return ret;
      });

    clusterData.forEach((element) => {
      const country = element.label.split("|")[1];
      if (addedCountries.indexOf(country) >= 0) {
        return;
      }
      addedCountries.push(country);
      const label = `${country}|country`, // changed from "root" to "country"
        newItem = { label, id: label, country };
      clusterData.push(newItem);
    });

    clusterData.push({ label: "country|", id: "country|" });

    return clusterData;
  };

  const dropSelection = () => {
    props.updateSelections([]);
  };

  const onMouseOver = (d: any) => {
    setHoverText(cleanPlaceName(d));
  };

  const onMouseOut = () => {
    setHoverText(" ");
  };

  return (
    <Card
      className={twMerge("flex flex-col !overflow-visible", props.className)}
      title="Birth places"
    >
      <Cluster
        height={400}
        items={cleanClusterData()}
        itemDict={props.birthPlaces}
        selections={props.selections}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        updateSelections={props.updateSelections}
      />

      <HoverText
        dropCallback={dropSelection}
        selections={props.selections}
        hoverText={hoverText}
        label={
          !props.selections || props.selections.length < 1
            ? ""
            : cleanPlaceName(props.selections[0])
        }
      />

      {/* auto suggest */}
      <div className="relative w-full">
        <div
          ref={autoSuggestRef}
          onClick={() => setShowSuggestions((prev) => !prev)}
        >
          <TextInput
            placeholder={"Type a place name"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSuggestionValue(e.target.value)
            }
            value={suggestionValue}
          />
        </div>
        {showSuggestions && (
          <ul
            className="absolute left-0 right-0 z-30 max-h-96 overflow-y-auto border-x border-b border-[#d3d3d3] bg-[#f5f5f5]"
            ref={suggestionRef}
          >
            {suggestions.map((s, i) => (
              <li key={`suggestion-${i}`} className="group list-none">
                <button
                  className="h-full w-full px-4 py-2 text-left font-yalenewroman text-[#444] group-hover:bg-[#fefefe]"
                  type="button"
                  onClick={() => {
                    props.updateSelections([s]);
                    setShowSuggestions(false);
                    setSuggestionValue("");
                  }}
                >
                  {s.label ?? "-"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
