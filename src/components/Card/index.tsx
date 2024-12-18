import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Card(props: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <div
      className={twMerge(
        'rounded-lg bg-white p-5 shadow-yale',
        props.className,
      )}
    >
      <h3 className="mb-4 text-center font-yalenewroman text-2xl">
        {props.title}
      </h3>
      {props.children}
    </div>
  );
}
