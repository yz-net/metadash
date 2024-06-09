export default function wrapResultListItem(WrappedComponent, key) {
  return (
    <div key={key} className="ResultListItem">
      {WrappedComponent}
    </div>
  );
}
