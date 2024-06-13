import { twMerge } from "tailwind-merge";

export default function TextInput(props) {
  return (
    <div className={twMerge(`relative block h-9 w-full`, props.className)}>
      <input
        className="absolute inset-0 border border-[#d3d3d3] bg-[#f5f5f5] pl-2 pr-7 text-[#222]"
        onChange={(e) => props.onChange(e)}
        value={props.value ?? ""}
        placeholder={props.placeholder}
        type="text"
      />
      <div className="pointer-events-none absolute right-0 flex h-full items-center justify-center px-2">
        <img src="/graphics/search-icon.svg" />
      </div>
    </div>
  );
}
