// @ts-nocheck

/**
 * subjects interface - create an API interface for subjects items
 */
import createReferenceInterface from "./createReferenceInterface";

import subjectsData from "./json/Subjects.json" assert { type: "json" };

const data = subjectsData.map((a) => {
  const ret = {
    label: a.title,
    id: a.uri,
  };
  return ret;
});

export default createReferenceInterface(data, "subject_refs");
