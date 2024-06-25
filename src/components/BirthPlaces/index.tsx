"use client";

import { useState } from "react";
import { normalizeString, objectToArray } from "~/utils/common";
import Cluster from "../Viz/Cluster";
import HoverText from "../Inputs/HoverText";
import Card from "../Card";

export default function BirthPlaces(props: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hoverText, setHoverText] = useState(" ");

  const cleanPlaceName = (item: any) => {
    if (!item) {
      return "";
    }
    let city = item.label.split("|")[0].split(",")[0],
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
    // return item.label.split("|")[0].split(",")[0] + ", " + item.country
  };
  const label = () => {
    if (!props.selections || props.selections.length < 1) {
      return "";
    }

    return cleanPlaceName(props.selections[0]);
    //        return props.selections[0].label.split("|")[0].split(",")[0] + ", " + props.selections[0].country
  };

  // the data needs to be reformatted a little bit
  // in order to work with a cluster pack layout.
  // we want to create a hierarchy of countries and cities
  const cleanClusterData = () => {
    // if (state.cleanClusterData) { return state.cleanClusterData }
    let addedCountries = [];

    let clusterData = objectToArray(props.allBirthPlaces)
      .filter(
        // only keep places with a city and country, in theory
        (place) =>
          place.label.split("|").filter((x) => x && x.length > 0).length === 2,
      )
      .map((item) => {
        let ret = { ...item };
        if (!(item.id in props.birthPlaces)) {
          ret.count = 0;
        }

        return ret;
      });

    // add an item for each country
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

  const getSuggestionValue = (suggestion: any) => {
    return cleanPlaceName(suggestion);
  };

  const getSuggestions = (value: any) => {
    const all = cleanClusterData();
    return (
      all
        .filter(
          (x) =>
            normalizeString(x.label ?? "").indexOf(
              normalizeString(value.replace(":", "|") ?? ""),
            ) >= 0,
        )
        // filter out roots
        .filter((x) => x.label.indexOf("|root") < 0)
        .filter((x) => x.label.indexOf("root|") < 0)
    );
    // return [{label: value + " and a hot plate!"}]
  };

  // @ts-ignore
  const onChange = (event, { newValue }) => {
    setSearchTerm(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion: any) => {
    return (
      <div className="suggestion">
        {cleanPlaceName(suggestion)}
        {/* {suggestion.label.split("|")[0].split(",").join(", ")} */}
      </div>
    );
  };

  // @ts-ignore
  const onSuggestionSelected = (e, { suggestion }) => {
    props.updateSelections([suggestion]);
  };

  const dropSelection = () => {
    props.updateSelections([]);
  };

  const onMouseOver = (d) => {
    setHoverText(cleanPlaceName(d));

    // setState({ hoverText: d.label.split("|")[0].split(",")[0] + ", " + d.country })
  };

  const onMouseOut = () => {
    setHoverText(" ");
  };

  return (
    <Card className={props.className} title="Birth places">
      <Cluster
        items={cleanClusterData()}
        // items={cleanClusterData()}
        // allItems={props.allBirthPlaces}
        itemDict={props.birthPlaces}
        selections={props.selections}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        updateSelections={props.updateSelections}
      />

      {/* TODO custom autosuggest component <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={onSuggestionSelected}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: "Type a place name",
          value: searchTerm,
          onChange: onChange,
        }}
      /> */}

      <HoverText
        dropCallback={dropSelection}
        selections={props.selections}
        hoverText={hoverText}
        label={label()}
      />
    </Card>
  );
}
