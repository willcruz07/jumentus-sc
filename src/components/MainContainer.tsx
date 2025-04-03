import React from 'react';

export function MainContainer({ children }: React.PropsWithChildren) {
  return (
    <main className="flex h-dvh w-dvw flex-col overflow-auto bg-slate-950 p-4">{children}</main>
  );
}
