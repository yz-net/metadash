import { FiX } from "react-icons/fi";

export default function SelectionPool(props: any) {
  return (
    <div className="overlfow-y-hidden flex max-h-20 flex-1 flex-nowrap gap-1 overflow-x-auto px-8 py-5">
      {(props.items || []).map((item: any, index: number) => (
        <button
          className="box-border flex h-5 flex-[0_0_auto] items-center justify-center gap-1 overflow-hidden rounded-lg bg-white px-2 font-sans text-xs text-[#6e6e6e] hover:bg-[#eff7fa]"
          key={index}
          onClick={() => props.onChange(item)}
          type="button"
        >
          <div className="text-nowrap">{item.label}</div>
          <FiX className="stroke-[#0d99aa]" size={15} />
        </button>
      ))}
    </div>
  );
}
