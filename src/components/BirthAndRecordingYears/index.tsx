import Histogram from "../Viz/Histogram";
import DoubleSlider from "../Inputs/DoubleSlider";
import Card from "../Card";

export default function BirthAndRecordingYear(props) {
  const updateRangeFactory = (key) => {
    return (value) => {
      var newDict = { ...props.selections };
      newDict[key] = value;
      props.updateSelections(newDict);
    };
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
    <Card className={modeClass} title="Dates">
      <div className="mx-7">
        <Histogram {...itemProps} />
      </div>

      <div className="slider-container">
        <div className="half">
          <DoubleSlider
            label="Birth year"
            updateSelections={updateRangeFactory("birth")}
            selections={props.selections.birth}
            min={props.BIRTH_MIN}
            max={props.BIRTH_MAX}
            margin={{ top: 2, bottom: 10, left: 20, right: 40 }}
          />
        </div>
        <div className="half">
          <DoubleSlider
            label="Recording year"
            selections={props.selections.recording}
            updateSelections={updateRangeFactory("recording")}
            min={props.RECORDING_MIN}
            max={props.RECORDING_MAX}
            margin={{ top: 2, bottom: 10, left: 20, right: 40 }}
          />
        </div>
      </div>
    </Card>
  );
}
