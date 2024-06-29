"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import RangeSlider from "react-range-slider-input";

import Histogram from "../Viz/Histogram";
import Card from "../Card";

import "react-range-slider-input/dist/style.css";
import "./style.scss";

export default function BirthAndRecordingYear(props: any) {
  const [birthYear, setBirthYear] = useState<[number, number]>([
    props.BIRTH_MIN,
    props.BIRTH_MAX,
  ]);
  const [recordingYear, setRecordingYear] = useState<[number, number]>([
    props.RECORDING_MIN,
    props.RECORDING_MAX,
  ]);

  const updateRangeFactory = () => {
    props.updateSelections({ birth: birthYear, recording: recordingYear });
  };

  const itemProps = {
    ...props,
    margin: {
      top: 0,
      left: 30,
      right: 10,
      bottom: 20,
    },
  };
  const modeClass = props.subsetMode ? "subset-mode" : "full-mode";

  return (
    <Card className={twMerge(props.className, modeClass)} title="Dates">
      <div className="mx-7">
        <Histogram {...itemProps} />
      </div>

      <div className="flex justify-around">
        <div className="box-border flex w-1/2 justify-center text-center">
          <div className="flex w-full flex-wrap">
            <div className="flex w-full flex-1 items-center justify-end">
              Birth year
            </div>
            <div className="flex-1">
              <RangeSlider
                className="range-slider"
                min={props.BIRTH_MIN}
                max={props.BIRTH_MAX}
                value={birthYear}
                onInput={setBirthYear}
                onRangeDragEnd={updateRangeFactory}
                onThumbDragEnd={updateRangeFactory}
              />
              {birthYear[0]} {birthYear[1]}
            </div>
          </div>
        </div>
        <div className="box-border flex w-1/2 justify-center text-center">
          <div className="flex w-full flex-wrap">
            <div className="flex w-full flex-1 items-center justify-end">
              Recording year
            </div>
            <div className="flex-1">
              <RangeSlider
                className="range-slider"
                min={props.RECORDING_MIN}
                max={props.RECORDING_MAX}
                value={recordingYear}
                onInput={setRecordingYear}
                onRangeDragEnd={updateRangeFactory}
                onThumbDragEnd={updateRangeFactory}
              />
              {recordingYear[0]} {recordingYear[1]}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
