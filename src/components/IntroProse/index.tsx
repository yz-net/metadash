export default function IntroProse(props) {
  const genderString = () => {
    if (!props.filters?.gender) {
      return "";
    }
    if (props.filters.gender.length < 1) {
      return "men and women";
    }
    const men = props.filters.gender.indexOf("men") >= 0,
      women = props.filters.gender.indexOf("women") >= 0,
      multiple = props.filters.gender.indexOf("multiple") >= 0;

    let term = "people";
    if (men && women) {
      term = "women and men";
    } else if (men) {
      term = "men";
    } else if (women) {
      term = "women";
    } else if (multiple) {
      term = "women and men testifying together";
    }

    return (
      <span>
        by <span className="stat">{term}</span>
      </span>
    );
  };

  const yearRangeString = (arr: [number, number]) => {
    if (!arr) {
      return null;
    }

    if (arr[0] === arr[1]) {
      return (
        <span>
          in <span className="stat">{arr[0]}</span>
        </span>
      );
    }

    return (
      <span>
        between <span className="stat">{arr.join(" and ")}</span>
      </span>
    );
  };

  const birthplaceString = () => {
    return null;
  };

  const languagesString = () => {
    const languageCount = Object.keys(props.summaryData.languages).length;
    return (
      <span>
        across{" "}
        <span className="stat">
          {languageCount.toLocaleString()}{" "}
          {languageCount > 1 ? "languages" : "language"}
        </span>
      </span>
    );
  };

  const programString = () => {
    const affiliateCount = Object.keys(props.summaryData.programs).length;
    return (
      <span>
        by{" "}
        <span className="stat">
          {affiliateCount.toLocaleString()}{" "}
          {affiliateCount > 1 ? "affilate programs" : "affiliate program"}
        </span>
      </span>
    );
  };

  return (
    <div className="IntroProse">
      This data dashboard visualizes &nbsp;
      <span className="stat">
        {props.items?.length.toLocaleString() ?? 0} testimonies
      </span>
      &nbsp;{genderString()}
      &nbsp;born{" "}
      {yearRangeString(
        props.filters.dateRanges.birth || [props.BIRTH_MIN, props.BIRTH_MAX],
      )}
      &nbsp;{birthplaceString()}
      &nbsp;who were interviewed{" "}
      {yearRangeString(
        props.filters.dateRanges.recording || [
          props.RECORDING_MIN,
          props.RECORDING_MAX,
        ],
      )}
      &nbsp;{languagesString()}
      &nbsp;{programString()}.
    </div>
  );
}
