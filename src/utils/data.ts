export function getRecordingYear(record: any) {
  // Returns only the first recording year
  return (record.recording_dates || [])
    .filter((a: any) => a)
    .map((a: any) => Number(a.slice(0, 4)))
    .sort()[0];
}
