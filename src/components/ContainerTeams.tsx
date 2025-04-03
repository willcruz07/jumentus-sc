interface IProps {
  name: string;
  children?: React.ReactNode;
}

export function ContainerTeams({ name, children }: IProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="mt-8 mb-2 font-sans text-lg text-gray-300">{name}</h1>
      </div>

      <div className="mt-1 flex min-h-30 w-full flex-row items-center overflow-auto rounded-lg border border-gray-800 bg-gray-900 px-2 py-4 shadow-sm">
        {children}
      </div>
    </div>
  );
}
