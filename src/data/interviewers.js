import createReferenceInterface from "./createReferenceInterface";

import interviewersData from "./json/Interviewers.json" assert { type: "json" };

const data = interviewersData.map((i) => {
  if (i.display_names.length > 1) {
    throw new Error("Interviewer with multiple names");
  }
  return {
    id: i.uri,
    label: i.display_names[0],
  };
});

export default createReferenceInterface(data, "interviewers");
