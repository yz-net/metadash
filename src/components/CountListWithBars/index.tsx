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
      <div className="pct-bar-container">
        <div style={{ width: width }} className="pct-bar"></div>
      </div>
    );
  };

  const total = props.items.reduce(
    (subtotal, nextItem) => subtotal + nextItem.count,
    0,
  );
  const width = (val: number) => `${(val * 100) / total}%`;

  return (
    <div ref={poolRef} className="count-list">
      {items
        .sort((a, b) => (a.count < b.count ? 1 : -1))
        .slice(0, options.itemCount)
        // .filter(a => a.label && a.label.length > 0)
        .map((item, i) => {
          // skip the filter loop
          if (!(item.label && item.label.length > 0)) {
            return null;
          }

          let itemCount, barWidth, className;

          if (item.id in props.itemDict) {
            className = "list-item";
            itemCount = props.itemDict[item.id].count.toLocaleString();
            barWidth = width(props.itemDict[item.id].count);
          } else {
            className = "list-item disabled";
            barWidth = 0;
            itemCount = "--";
          }

          if (item.id in props.selections) {
            className = "list-item selected";
          }

          return (
            <div
              onClick={() => (props.handleItemClick || (() => {}))(item)}
              key={i}
              className={className}
            >
              <div className="x-circle-icon"></div>
              <div className="list-item-name">{item.label}</div>
              {renderBar(barWidth)}
              <div className="list-item-value">{itemCount}</div>
            </div>
          );
        })}
    </div>
  );
}
