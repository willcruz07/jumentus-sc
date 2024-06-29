import React from 'react';

export function MainContainer({ children }: React.PropsWithChildren) {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex min-h-screen min-w-full max-w-[932px] flex-col bg-gray-950 p-5">
        {children}
      </div>
    </main>
  );
}
