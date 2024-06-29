import React from 'react';

export function MainContainer({ children }: React.PropsWithChildren) {
  return (
    <main className="flex min-h-screen max-w-2xl flex-col bg-gray-950 p-5">
      {children}
    </main>
  );
}
