"use client";

import { useState, useRef, useEffect } from "react";

export default function CountListWithBars(props) {
  const [options, setOptions] = useState({
    itemCount: 100,
    increment: 10,
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(props.showAll ? props.allItems : props.items);
  }, [props.showAll]);

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

  const renderBar = (width: number) => {
    if (!props.showBars) {
      return;
    }
    return (
      <div className="h-3 flex-[4_4] bg-[#d9e9f2]">
        <div
          style={{ width: width }}
          className="bg-[#0d99aa] transition-colors"
        ></div>
      </div>
    );
  };

  const total = props.items.reduce(
    (subtotal, nextItem) => subtotal + nextItem.count,
    0,
  );
  const width = (val: number) => `${(val * 100) / total}%`;

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
            className = " items-center cursor-pointer flex leading-6 mb-0";

          if (item.id in props.itemDict) {
            className += "";
            itemCount = props.itemDict[item.id].count.toLocaleString();
            barWidth = width(props.itemDict[item.id].count);
          } else {
            className += "";
            barWidth = 0;
            itemCount = "--";
          }

          if (item.id in props.selections) {
            className += " text-[#222]";
          }

          return (
            <div
              onClick={() => (props.handleItemClick || (() => {}))(item)}
              key={i}
              className={className}
            >
              <div className="pl-3"></div>
              <div className="flex-[4_4] px-3 text-right">{item.label}</div>
              {renderBar(barWidth)}
              <div className="flex-[4_4] px-3 text-left">{itemCount}</div>
            </div>
          );
        })}
    </div>
  );
}
