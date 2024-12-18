'use client';

import { useEffect, useState } from 'react';
import { getRecordingYear } from '~/utils/data';

export default function Results(props: any) {
  const [options, setOptions] = useState({
    limit: 1,
    increment: 1,
  });

  useEffect(() => {
    const trackScrolling = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const distanceFromBottom =
        window.document.body.offsetHeight - scrollBottom;
      if (props.results.length > options.limit && distanceFromBottom < 100) {
        setOptions((prev) => ({
          ...prev,
          limit: prev.limit + prev.increment,
        }));
      }
    };
    document.addEventListener('scroll', trackScrolling);
    return () => document.removeEventListener('scroll', trackScrolling);
  }, []);

  return (
    <div className="box-border max-w-full px-3 font-sans lg:px-20">
      <div className="mx-auto mb-8 max-w-5xl text-center font-yalenewroman text-2xl text-[#4a4a4a]">
        There are{' '}
        <span className="text-[#ca6251]" suppressHydrationWarning>
          {(props.results?.length ?? 0).toLocaleString()}
        </span>{' '}
        testimonies with matching criteria.
      </div>

      {/* Result list header */}
      <div className="mb-4 flex pl-5 font-semibold text-[#aaa]">
        <div className="flex-[2_1]">Testimony title</div>
        <div className="hidden flex-1 md:block">Birth year / place</div>
        <div className="hidden flex-[2_1] xl:block">Affiliate</div>
        <div className="hidden flex-1 2xl:block">Recording year</div>
        <div className="flex-1">&nbsp;</div>
      </div>

      {/* Result list */}
      <div>
        {props.results
          ?.slice(0, options.limit)
          .map((result: any, index: number) => (
            <div
              key={index}
              className="group mb-4 rounded-lg border-l-[10px] border-[#8ec8cc] bg-white shadow-none hover:border-[#ca6251] hover:shadow-yale"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={result.link}
                key={index}
              >
                <div
                  className={`flex h-16 items-center justify-around py-px font-sans text-sm font-semibold ${result.birth_years.length > 1 ? 'multiple' : ''}`}
                >
                  <div className="flex-[2_1] pl-5 text-[20px] font-semibold text-[#6e6e6e]">
                    {result.title}
                  </div>
                  <div className="hidden flex-1 md:block">
                    {
                      result.birth_years
                        .filter((yr: any) => yr)
                        .map((yr: any) => (
                          <li
                            className="m-0 list-none p-0 text-[#6e6e6e]"
                            key={`year-${index}`}
                          >
                            {Number(yr).toFixed(0)}
                          </li>
                        ))
                        .concat(
                          result.birth_place_cities
                            .filter(
                              (_: any, i: number) =>
                                result.birth_place_cities[i] ||
                                result.birth_place_countries[i],
                            )
                            .map((city: any, i: number) => (
                              <li
                                className="m-0 list-none p-0 text-[#6e6e6e]"
                                key={`city-birthplace-${i}`}
                              >
                                {city}
                                {city && result.birth_place_countries[i]
                                  ? ', '
                                  : ''}
                                {result.birth_place_countries[i]}
                              </li>
                            )),
                        )
                        .slice(-2) // don't show more than two items
                    }
                  </div>
                  <div className="hidden flex-[2_1] xl:block">
                    {result.programs.map((ref: any, i: number) => (
                      <li className="m-0 list-none p-0 text-[#6e6e6e]" key={i}>
                        {props.programs[ref].label}
                      </li>
                    ))}
                  </div>
                  <div className="hidden flex-1 2xl:block">
                    <li className="m-0 list-none p-0 text-[#6e6e6e]">
                      {getRecordingYear(result)}
                    </li>
                  </div>
                  <div className="flex-1">
                    <div className="mx-auto flex h-8 w-20 items-center justify-center rounded-lg bg-[#8ec8cc] text-white group-hover:bg-[#ca6251]">
                      View
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
