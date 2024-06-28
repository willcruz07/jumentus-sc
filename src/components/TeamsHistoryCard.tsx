interface IProps {
  position: string;
  teamColor: string;
  V: string;
  D: string;
  E: string;
  GP: string;
  GC: string;
  SG: string;
}

export function TeamsHistoryCard({
  position,
  D,
  E,
  GC,
  GP,
  V,
  SG,
  teamColor,
}: IProps) {
  return (
    <div className="flex flex-row mt-1 items-center border border-gray-800 rounded-lg bg-gray-900 shadow-sm hover:bg-gray-950">
      <h1 className="pl-3 pr-6 font-sans font-bold text-2xl">{position}</h1>

      <div className="flex flex-row w-full gap-3 border p-2 mt-2 mr-2 mb-2 border-gray-800 rounded-lg bg-gray-900 shadow-sm hover:bg-gray-950">
        <div className="bg-gray-800 p-1 rounded-lg">
          <div className={`w-8 h-9 rounded-lg ${teamColor}`} />
        </div>
        <div className="grid grid-cols-6 w-full">
          <div className="flex flex-col gap-1 items-center">
            <h5 className="font-sans text-sm font-semibold">V</h5>
            <h6 className="font-sans text-sm text-gray-400">{V}</h6>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h5 className="font-sans text-sm font-semibold">E</h5>
            <h6 className="font-sans text-sm text-gray-400">{E}</h6>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h5 className="font-sans text-sm font-semibold">D</h5>
            <h6 className="font-sans text-sm text-gray-400">{D}</h6>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h5 className="font-sans text-sm font-semibold">GP</h5>
            <h6 className="font-sans text-sm text-gray-400">{GP}</h6>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h5 className="font-sans text-sm font-semibold">GC</h5>
            <h6 className="font-sans text-sm text-gray-400">{GC}</h6>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h5 className="font-sans text-sm font-semibold">SG</h5>
            <h6 className="font-sans text-sm text-gray-400">{SG}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
