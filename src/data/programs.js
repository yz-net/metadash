// @ts-nocheck

import createReferenceInterface from './createReferenceInterface';

import programsData from './json/Programs.json' assert { type: 'json' };

const data = programsData.map((i) => {
  if (i.display_names.length > 1) {
    throw new Error('Program with multiple names');
  }
  return {
    id: i.uri,
    label: i.display_names[0],
  };
});

export default createReferenceInterface(data, 'programs');
