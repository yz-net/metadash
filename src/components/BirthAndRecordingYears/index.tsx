'use client';

import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
// @ts-ignore
import RangeSlider from 'react-range-slider-input';

import Histogram from '../Viz/Histogram';
import Card from '../Card';

import 'react-range-slider-input/dist/style.css';
import './styles.scss';

export default function BirthAndRecordingYear(props: any) {
  const [birthYear, setBirthYear] = useState<[number, number]>([
    props.BIRTH_MIN,
    props.BIRTH_MAX,
  ]);
  const [recordingYear, setRecordingYear] = useState<[number, number]>([
    props.RECORDING_MIN,
    props.RECORDING_MAX,
  ]);

  const [birthHover, setBirthHover] = useState<[boolean, boolean]>([
    false,
    false,
  ]);
  const [recordingHover, setRecordingHover] = useState<[boolean, boolean]>([
    false,
    false,
  ]);

  useEffect(() => {
    const birthThumbs = document
      .getElementsByClassName('range-slider-birth')[0]
      ?.getElementsByClassName('range-slider__thumb');
    if (!birthThumbs) {
      return;
    }

    const recordingThumbs = document
      .getElementsByClassName('range-slider-recording')[0]
      ?.getElementsByClassName('range-slider__thumb');
    if (!recordingThumbs) {
      return;
    }

    const onMouseOverBirth = (event: any) => {
      setBirthHover((prev) => [
        event.target.hasAttribute('data-lower') ? true : prev[0],
        event.target.hasAttribute('data-upper') ? true : prev[1],
      ]);
    };
    const onMouseOutBirth = (event: any) => {
      setBirthHover((prev) => [
        event.target.hasAttribute('data-lower') ? false : prev[0],
        event.target.hasAttribute('data-upper') ? false : prev[1],
      ]);
    };
    for (const thumb of birthThumbs) {
      thumb.addEventListener('mouseover', onMouseOverBirth);
      thumb.addEventListener('mouseout', onMouseOutBirth);
    }

    const onMouseOverRecording = (event: any) => {
      setRecordingHover((prev) => [
        event.target.hasAttribute('data-lower') ? true : prev[0],
        event.target.hasAttribute('data-upper') ? true : prev[1],
      ]);
    };
    const onMouseOutRecording = (event: any) => {
      setRecordingHover((prev) => [
        event.target.hasAttribute('data-lower') ? false : prev[0],
        event.target.hasAttribute('data-upper') ? false : prev[1],
      ]);
    };
    for (const thumb of recordingThumbs) {
      thumb.addEventListener('mouseover', onMouseOverRecording);
      thumb.addEventListener('mouseout', onMouseOutRecording);
    }
    return () => {
      for (const thumb of birthThumbs) {
        thumb.removeEventListener('mouseover', onMouseOverBirth);
        thumb.removeEventListener('mouseout', onMouseOutBirth);
      }
      for (const thumb of recordingThumbs) {
        thumb.removeEventListener('mouseover', onMouseOverRecording);
        thumb.removeEventListener('mouseout', onMouseOutRecording);
      }
    };
  }, []);

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
  const modeClass = props.subsetMode ? 'subset-mode' : 'full-mode';

  return (
    <Card className={twMerge(props.className, modeClass)} title="Dates">
      <div className="mx-7">
        <Histogram {...itemProps} />
      </div>

      <div className="flex gap-3 px-3 pt-3">
        <div className="flex w-1/2 items-center gap-5">
          <span className="flex-1 pb-2 text-right text-xs font-semibold">
            Birth year
          </span>
          <div className="flex-1">
            <RangeSlider
              className="range-slider-birth"
              min={props.BIRTH_MIN}
              max={props.BIRTH_MAX}
              value={birthYear}
              onInput={setBirthYear}
              onRangeDragEnd={updateRangeFactory}
              onThumbDragEnd={updateRangeFactory}
            />
            <div className="flex justify-between pt-2">
              <span
                className={twMerge(
                  'text-xs',
                  birthHover[0] ? 'text-[#ca6251]' : '',
                )}
              >
                {birthYear[0]}
              </span>
              <span
                className={twMerge(
                  'text-xs',
                  birthHover[1] ? 'text-[#ca6251]' : '',
                )}
              >
                {birthYear[1]}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 items-center gap-5">
          <span className="flex-1 pb-2 text-right text-xs font-semibold">
            Recording year
          </span>
          <div className="flex-1">
            <RangeSlider
              className="range-slider-recording"
              min={props.RECORDING_MIN}
              max={props.RECORDING_MAX}
              value={recordingYear}
              onInput={setRecordingYear}
              onRangeDragEnd={updateRangeFactory}
              onThumbDragEnd={updateRangeFactory}
            />
            <div className="flex justify-between pt-2">
              <span
                className={twMerge(
                  'text-xs',
                  recordingHover[0] ? 'text-[#ca6251]' : '',
                )}
              >
                {recordingYear[0]}
              </span>

              <span
                className={twMerge(
                  'text-xs',
                  recordingHover[1] ? 'text-[#ca6251]' : '',
                )}
              >
                {recordingYear[1]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
