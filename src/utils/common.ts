// @ts-nocheck

export function normalizeString(term: string) {
  return (term ?? "").toString().trim().toLowerCase();
}

// replace the keys in a dictionary with something else
export function replaceKeys(dictObj, keyMap) {
  const ret = {};
  for (const k in dictObj) {
    ret[keyMap[k]] = dictObj[k];
  }
  return ret;
}

export function arrayToObject(arr: any[]) {
  if (!Array.isArray(arr)) {
    return {};
  }

  const obj: Record<string, any> = {};
  arr.forEach((item) => {
    obj[item.id] = item;
  });

  return obj;
}

export function objectToArray(obj) {
  obj = obj || [];
  return Object.keys(obj).map((k) => obj[k]);
}
