"use client";

import { useState, useRef, useEffect } from "react";
import TagPoolItem from "./TagPoolItem";
import "./main.scss";

export default function TagPool(props) {
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
    <div ref={poolRef} className="TagPool">
      {(props.items.slice(0, options.itemCount) || []).map((item, i) => {
        return (
          <TagPoolItem
            callback={props.callback || function () {}}
            key={i}
            item={item}
          ></TagPoolItem>
        );
      })}
    </div>
  );
}
