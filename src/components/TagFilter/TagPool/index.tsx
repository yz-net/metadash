"use client";

import { useState, useRef, useEffect } from "react";
import "./main.scss";

export default function TagPool(props: any) {
  const [options, setOptions] = useState({
    itemCount: 100,
    increment: 50,
  });

  const poolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!poolRef.current) {
      return;
    }
    poolRef.current.addEventListener("scroll", trackScrolling);

    return () => poolRef.current?.removeEventListener("scroll", trackScrolling);
  }, [poolRef.current]);

  const trackScrolling = () => {
    // this adds lazy loading in 100-item increments
    if (!poolRef.current || options.itemCount >= props.items) {
      return;
    }

    const scrollTop = poolRef.current.scrollTop,
      scrollBottom = scrollTop + poolRef.current.getBoundingClientRect().height,
      totalHeight = poolRef.current.getBoundingClientRect().height,
      //   startPct = scrollTop / totalHeight,
      endPct = scrollBottom / totalHeight;

    if (endPct * 100 > 80) {
      setOptions((prev) => ({
        ...prev,
        itemCount: prev.itemCount + prev.increment,
      }));
    }
  };

  return (
    <div
      ref={poolRef}
      className="my-px flex h-[160px] max-h-full flex-wrap justify-center overflow-hidden overflow-y-scroll bg-white px-0 py-8 md:mx-3 lg:mx-20"
    >
      {(props.items.slice(0, options.itemCount) || []).map(
        (item: any, index: number) => (
          <button
            data-value={item.value}
            className="m-0 border-none px-2 py-1 font-sans text-sm hover:bg-[#eff7fa] hover:text-[#0d99aa]"
            type="button"
            onClick={() => props.onChange(item)}
            key={index}
          >
            {item.label}
          </button>
        ),
      )}
    </div>
  );
}
