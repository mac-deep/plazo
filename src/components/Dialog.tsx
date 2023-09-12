import { ReactElement } from 'react';

export default function Dialog({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactElement;
  className?: string;
}) {
  return (
    <dialog id={id} className={className}>
      {children}
    </dialog>
  );
}
