import { snakeCaseToWords } from "@/fwk/utils";

interface Props {
  data: TSAny[];
  onCardClick: (card: TSAny) => void;
}

export default function IntelCards({ data, onCardClick }: Props) {
  const renderIntelCard = (intel: TSAny) => {
    return (
      <div
        key={intel.id}
        className="flex flex-col w-full gap-3 p-4 bg-white rounded-lg hover:shadow-md cursor-pointer border border-gray-200 hover:border-gray-300"
        onClick={() => onCardClick(intel)}
      >
        <div className="text-lg font-bold text-gray-800 line-clamp-2">
          {intel.title}
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-500 line-clamp-6">
            {intel.content}
          </div>
        </div>
        <div className="text-sm text-stone-600 flex justify-end bottom-0">
          {snakeCaseToWords(intel.source)}
        </div>
      </div>
    );
  };

  return (
    <div className="grid lg:grid-cols-3 lg:gap-4 md:grid-cols-2 md:gap-3 sm:grid-cols-1 sm:gap-1 p-4">
      {data.map(renderIntelCard)}
    </div>
  );
}
