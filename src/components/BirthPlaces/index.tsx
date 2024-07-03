"use client";

import { useState } from "react";

import { normalizeString, objectToArray } from "~/utils/common";
import Cluster from "../Viz/Cluster";
import HoverText from "../HoverText";
import Card from "../Card";
import AutoSuggest from "../AutoSuggest";

export default function BirthPlaces(props: any) {
  const [hoverText, setHoverText] = useState(" ");
  const [selection, setSelection] = useState<any>();

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
  };
  const label = () => {
    if (!props.selections || props.selections.length < 1) {
      return "";
    }

    return cleanPlaceName(props.selections[0]);
  };

  const cleanClusterData = () => {
    let addedCountries: any[] = [];

    let clusterData = objectToArray(props.allBirthPlaces)
      .filter(
        (place) =>
          place.label.split("|").filter((x: any) => x && x.length > 0)
            .length === 2,
      )
      .map((item) => {
        let ret = { ...item };
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
    <Card className={props.className} title="Birth places">
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
        label={label()}
      />

      <AutoSuggest
        placeholder="Type a place name"
        suggestions={cleanClusterData()}
        onSelect={(s: any) => setSelection(s)}
        clearOnSelect
      />
    </Card>
  );
}
