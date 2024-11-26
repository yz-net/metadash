import { useEffect, useRef, useState } from "react";

import TextInput from "../TextInput";

export default function AutoSuggest(props: any /* TODO */) {
  const [value, setValue] = useState<string>(props.value ?? "");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>(
    props.suggestions ?? [],
  );

  const inputRef = useRef<HTMLDivElement>(null);
  const suggestionRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setShowSuggestions(value.length > 0);
    setSuggestions(
      value.length > 0
        ? props.suggestions.filter((s: any) =>
            s.label.toLowerCase().includes(value.toLowerCase()),
          )
        : props.suggestions,
    );
  }, [value]);

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, []);

  const handleSelect = (suggestion: any) => {
    if (suggestion) {
      props.onSelect([suggestion]);
    }
    setShowSuggestions(false);
    if (props.clearOnSelect) {
      setValue("");
    }
  };

  console.log("SUGGESTIONS", suggestions);

  return (
    <div className="relative w-full">
      <div ref={inputRef} onClick={() => setShowSuggestions((prev) => !prev)}>
        <TextInput
          placeholder={props.placeholder ?? "Placeholder"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          value={value}
        />
      </div>
      {showSuggestions && (
        <ul
          className="absolute left-0 right-0 z-30 max-h-96 overflow-y-auto border-x border-b border-[#d3d3d3] bg-[#f5f5f5]"
          ref={suggestionRef}
        >
          {suggestions.map((s, i) => (
            <li key={`suggestion-${i}`} className="group list-none">
              <button
                className="h-full w-full px-4 py-2 text-left font-yalenewroman text-[#444] group-hover:bg-[#fefefe]"
                type="button"
                onClick={() => handleSelect(s)}
              >
                {s.label ?? "-"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
