'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

export default function CountListWithBars(props: any) {
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
    poolRef.current.addEventListener('scroll', trackScrolling);

    return () => poolRef.current?.removeEventListener('scroll', trackScrolling);
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
    (subtotal: any, nextItem: any) => subtotal + nextItem.count,
    0,
  );

  return (
    <div
      ref={poolRef}
      className="max-h-full overflow-auto font-sans text-xs font-semibold text-[#6e6e6e]"
    >
      {items
        .sort((a: any, b: any) => (a.count < b.count ? 1 : -1))
        .slice(0, options.itemCount)
        .map((item: any, i: number) => {
          if (!(item.id && item.label && item.label.length > 0)) {
            return null;
          }

          let itemCount,
            barWidth,
            selected = false,
            className = 'group items-center flex leading-6 mb-0';

          if (item.id in props.itemDict) {
            itemCount = props.itemDict[item.id].count.toLocaleString();
            barWidth = (props.itemDict[item.id].count * 100) / total;
          } else {
            barWidth = 0;
            itemCount = '--';
          }

          if (
            Array.isArray(props.selections)
              ? props.selections.some((s: any) => item.id === s.id)
              : Object.keys(props.selections).some((s: any) => s === item.id)
          ) {
            selected = true;
            className += ' text-[#222]';
          }

          return (
            <button
              key={i}
              className={twMerge('w-full py-0.5 hover:bg-[#eff7fa]', className)}
              onClick={() => props.handleItemClick(item)}
              type="button"
            >
              <div
                className={twMerge(
                  'ml-2.5 rounded-full bg-[#8ec8cc]',
                  selected ? 'opacity-100' : 'opacity-0',
                )}
              >
                <FiX className="stroke-white" />
              </div>
              <div className="flex-[4_4] flex-shrink text-wrap px-2.5 text-left font-sans group-hover:text-black">
                {item.label}
              </div>
              {props.showBars && (
                <div className="relative h-3 flex-[4_4] flex-shrink-0 bg-[#d9e9f2]">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${barWidth}%` }}
                    exit={{ width: '0%' }}
                    className="absolute inset-0 z-10 h-full bg-[#0d99aa] transition-[colors,width] group-hover:!w-full group-hover:bg-[#ca6251]"
                  />
                </div>
              )}
              <div
                className={twMerge(
                  'flex-[4_4] px-2.5 text-left group-hover:text-black',
                  props.itemCountClassName,
                )}
              >
                {itemCount}
              </div>
            </button>
          );
        })}
    </div>
  );
}
