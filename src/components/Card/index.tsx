import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Card(props: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <div className={twMerge("rounded-lg p-3 shadow-lg", props.className)}>
      <h3 className="text-center">{props.title}</h3>
      {props.children}
    </div>
  );
}
