import { FiX } from 'react-icons/fi';

export default function HoverText(props: any) {
  let ret = null;

  if (!props.selections || props.selections.length < 1) {
    ret = (
      <div className="flex h-6 items-center justify-center gap-2">
        <div className="flex items-center justify-center rounded-full bg-[#8ec8cc] p-0.5 opacity-0">
          <FiX className="stroke-white" size={12} />
        </div>
        <div>{props.hoverText || ' '}</div>
      </div>
    );
  } else {
    const htext =
      props.hoverText?.trim().length > 0 ? props.hoverText : props.label || ' ';
    ret = (
      <button
        className="group flex h-6 w-full items-center justify-center gap-2"
        onClick={props.dropCallback}
        type="button"
      >
        <div className="flex items-center justify-center rounded-full bg-[#8ec8cc] p-0.5 group-hover:opacity-75">
          <FiX className="stroke-white" size={12} />
        </div>
        <div>{htext}</div>
      </button>
    );
  }

  return (
    <div className="py-3 text-center font-sans text-sm text-[#6e6e6e]">
      {ret}
    </div>
  );
}
