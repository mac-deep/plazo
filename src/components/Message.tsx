import { ReactNode } from 'react';

export default function MessageScreen({ children }: { children: ReactNode }) {
  return (
    <span className="top-0 flex-col left-0 h-[-webkit-fill-available] w-[-webkit-fill-available] absolute z-10 bg-white flex justify-center items-center">
      {children}
    </span>
  );
}
