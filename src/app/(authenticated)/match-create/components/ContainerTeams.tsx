/* eslint-disable @next/next/no-img-element */
interface IProps {
  name: string;
  children?: React.ReactNode;
}

export function ContainerTeams({ name, children }: IProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-md mb-2 mt-8 font-sans text-gray-300">{name}</h1>
      </div>

      <div className="mt-1 flex flex-row items-center overflow-auto rounded-lg border border-gray-800 bg-gray-900 py-4 shadow-sm">
        {children}
      </div>
    </div>
  );
}
