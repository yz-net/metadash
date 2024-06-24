"use client";

import { useEffect, useState } from "react";
import BirthAndRecordingYear from "~/components/BirthAndRecordingYears";
import BirthPlaces from "~/components/BirthPlaces";
import Gender from "~/components/Gender";
import Interviewers from "~/components/Interviewers";
import IntroProse from "~/components/IntroProse";
import Languages from "~/components/Languages";
import Programs from "~/components/Programs";
import Results from "~/components/Results";
import SiteBanner from "~/components/SiteBanner";
import SubjectHeadings from "~/components/SubjectHeadings";
import { objectToArray } from "~/utils/common";

import * as data from "~/data";

const BIRTH_MIN = 1890;
const BIRTH_MAX = 1945;
const RECORDING_MIN = 1970;
const RECORDING_MAX = 2020;

const DEFAULT_FILTERS = {
  gender: ["men", "women", "multiple"],
  birthYear: [],
  birthCountry: [],
  language: [],
  yearRecorded: [],
  subjects: [],
  interviewers: [],
  programs: [],
  dateRanges: {},
};

const defaultFullData = data.getData();

export default function HomePage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [fullData, setFullData] = useState(defaultFullData);

  useEffect(() => {
    setFullData(data.getData(filters));
  }, [filters]);

  const setNewFilters = (f) => {
    const newFilters = f || DEFAULT_FILTERS;
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const updateFilterFactory = (key) => {
    return (val) => {
      const newFilters = { ...filters };
      newFilters[key] = val;
      setNewFilters(newFilters);
    };
  };

  return (
    <>
      <SiteBanner />
      <div className="MetaDash">
        <section className="prose intro-prose-section">
          <IntroProse
            items={fullData.resources}
            filters={filters}
            summaryData={fullData.summaryData}
            BIRTH_MIN={BIRTH_MIN}
            BIRTH_MAX={BIRTH_MAX}
            RECORDING_MIN={RECORDING_MIN}
            RECORDING_MAX={RECORDING_MAX}
          />
        </section>

        <section className="module-area">
          <div className="flex justify-end pr-7 font-proximanova">
            <button
              className="pl-3 font-sans text-[#aaa] underline hover:text-[#ca6251]"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
          <Gender
            updateSelections={updateFilterFactory("gender")}
            men={fullData.summaryData.gender.men.count}
            women={fullData.summaryData.gender.women.count}
            multiple={fullData.summaryData.gender.multiple.count}
          />
          <Languages
            updateSelections={updateFilterFactory("language")}
            selections={filters.language}
            items={objectToArray(fullData.summaryData.languages)}
            itemDict={fullData.summaryData.languages}
            allItems={objectToArray(fullData.summaryData.languages)}
          />
          <BirthAndRecordingYear
            minYear={BIRTH_MIN}
            maxYear={RECORDING_MAX}
            BIRTH_MIN={BIRTH_MIN}
            BIRTH_MAX={BIRTH_MAX}
            RECORDING_MIN={RECORDING_MIN}
            RECORDING_MAX={RECORDING_MAX}
            updateSelections={updateFilterFactory("dateRanges")}
            selections={filters.dateRanges}
            subsetMode={fullData.resources.length > fullData.resources.length}
            data={Object.keys(fullData.summaryData.birthYears)
              .map((k) => fullData.summaryData.birthYears[k])
              // TODO - the data needs to be cleaned up
              // so we don't need to manually exclude stuff
              .filter((yrs) => yrs.label >= BIRTH_MIN && yrs.label <= BIRTH_MAX)
              .map((a) => {
                return { ...a, barClass: "birth fill-[#ca6251]" };
              })
              .concat(
                Object.keys(fullData.summaryData.recordingYears)
                  .map((k) => fullData.summaryData.recordingYears[k])
                  .filter(
                    (yrs) =>
                      yrs.label >= RECORDING_MIN && yrs.label <= RECORDING_MAX,
                  )
                  .map((a) => {
                    return { ...a, barClass: "recording fill-[#ca6251]" };
                  }),
              )}
          />
          <BirthPlaces
            updateSelections={updateFilterFactory("birthplaces")}
            selections={filters.birthplaces}
            birthPlaces={fullData.summaryData.birthPlaces}
            allBirthPlaces={fullData.summaryData.birthPlaces}
            placeholder="Search for a city..."
          />
          <Interviewers
            interviewers={fullData.summaryData.interviewers}
            allInterviewers={defaultFullData.summaryData.interviewers}
            updateSelections={updateFilterFactory("interviewers")}
            selections={filters.interviewers}
            selectionsDict={objectToArray(filters.interviewers)}
            filterItems={(t: string) => {
              // 6-3-19 - just updated to return both an array and a dictionary
              // so it doesn't have to be retouched later on. (dict+arr+interviewers)
              const results = data.interviewers.search((t ?? "").split(" "));
              let retDict = {};
              let retArr = results
                .filter((i) => i.id in fullData.summaryData.interviewers)
                .map((i) => {
                  const retItem = {
                    ...i,
                    count: fullData.summaryData.interviewers[i.id].count,
                  };
                  retDict[i.id] = retItem;
                  return retItem;
                });

              return [retArr, retDict];
            }}
          />
          <Programs
            updateSelections={updateFilterFactory("programs")}
            selections={filters.programs}
            allItems={fullData.summaryData.programs}
            programs={fullData.summaryData.programs}
            filterItems={data.programs.search}
            placeholder="Begin searching programs..."
          />
        </section>

        <section className="headings-area">
          <SubjectHeadings
            title="Subjects"
            updateSelections={updateFilterFactory("subjects")}
            selections={filters.subjects}
            allItems={fullData.summaryData.subjects}
            filterItems={data.subjects.search}
            placeholder="Begin searching subjects..."
          />
        </section>

        <section className="mt-8">
          <Results
            programs={fullData.summaryData.programs}
            results={fullData.resources}
          />
        </section>
      </div>
    </>
  );
}
