import React from "react";
import TagFilter from "../Inputs/TagFilter";

export default function SubjectHeadings(props: any) {
  return (
    <div className="SubjectHeadings">
      <TagFilter {...props} />
    </div>
  );
}
