"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function CountListWithBars(props) {
  const [options, setOptions] = useState({
    itemCount: 100,
    increment: 10,
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(props.showAll ? props.allItems : props.items);
  }, [props.showAll, props.items]);

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
      totalHeight = poolRef.current.scrollHeight; //getBoundingClientRect().height,
    if (totalHeight - scrollBottom <= 80) {
      setOptions((prev) => ({
        itemCount: prev.itemCount + prev.increment,
        increment: prev.increment,
      }));
    }
  };

  const total = props.items.reduce(
    (subtotal, nextItem) => subtotal + nextItem.count,
    0,
  );

  return (
    <div
      ref={poolRef}
      className="max-h-full overflow-auto font-sans text-xs font-semibold text-[#6e6e6e] "
    >
      {items
        .sort((a, b) => (a.count < b.count ? 1 : -1))
        .slice(0, options.itemCount)
        .map((item, i) => {
          if (!(item.label && item.label.length > 0)) {
            return null;
          }

          let itemCount,
            barWidth,
            selected = false,
            className = "group items-center cursor-pointer flex leading-6 mb-0";

          if (item.id in props.itemDict) {
            itemCount = props.itemDict[item.id].count.toLocaleString();
            barWidth = (props.itemDict[item.id].count * 100) / total;
          } else {
            barWidth = 0;
            itemCount = "--";
          }

          if (item.id in props.selections) {
            (selected = true), (className += " text-[#222]");
          }

          return (
            <div
              onClick={() => (props.handleItemClick || (() => {}))(item)}
              key={i}
              className={className}
            >
              <div className="pl-3">
                <img
                  className={selected ? "visible" : "invisible"}
                  src="/graphics/x-circle-icon.svg"
                />
              </div>
              <div className="flex-[4_4] px-3 text-right group-hover:text-black">
                {item.label}
              </div>
              {props.showBars && (
                <div className="relative h-3 flex-[4_4] bg-[#d9e9f2]">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${barWidth}%` }}
                    exit={{ width: "0%" }}
                    className="z-10 h-full bg-[#0d99aa] transition-[colors,width] group-hover:!w-full group-hover:bg-[#ca6251]"
                  />
                </div>
              )}
              <div className="flex-[4_4] px-3 text-left group-hover:text-black">
                {itemCount}
              </div>
            </div>
          );
        })}
    </div>
  );
}
