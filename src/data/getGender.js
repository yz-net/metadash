// @ts-nocheck

import * as staticStuff from './static';

function getGender(resource) {
  const men = resource.subject_refs.indexOf(staticStuff.MEN_SUBJECT) >= 0,
    women = resource.subject_refs.indexOf(staticStuff.WOMEN_SUBJECT) >= 0,
    multiple = men && women;

  if (multiple) {
    return 'multiple';
  } else if (women) {
    return 'women';
  } else if (men) {
    return 'men';
  }
  return 'unknown';
}

export { getGender };
