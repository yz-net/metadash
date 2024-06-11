import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Card(props: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <div
      className={twMerge(
        "rounded-lg bg-white p-5 shadow-[1px_1px_6px_rgba(0,0,0,.16)]",
        props.className,
      )}
    >
      <h3 className="font-yalenewroman mb-4 text-center text-2xl">
        {props.title}
      </h3>
      {props.children}
    </div>
  );
}
