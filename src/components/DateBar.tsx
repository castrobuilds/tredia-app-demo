import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export default function DateBar() {
  return (
    <div className="flex items-center justify-between px-8 py-2 border-b border-stone-200 bg-stone-100 shadow-md">
      {/* Yesterday Button */}
      <button
        onClick={() => console.log("Yesterday clicked")}
        className="flex items-center space-x-4 hover:bg-stone-200 transition-colors rounded-md px-3 py-2 cursor-pointer"
      >
        <MdArrowBackIosNew size={24} />
        <div className="flex flex-col items-center">
          <span className="text-md font-medium text-gray-700 hover:text-black">
            Yesterday
          </span>
          <span className="text-xs text-neutral-500 hover:text-black">
            Sep 20
          </span>
        </div>
      </button>
      {/* Today Button */}
      <button
        onClick={() => console.log("Today clicked")}
        className="flex items-center space-x-4 hover:bg-stone-200 transition-colors rounded-md px-3 py-2 cursor-pointer"
      >
        <span className="text-2xl font-medium text-gray-700 hover:text-black">
          Today
        </span>
      </button>
      {/* Tomorrow Button */}
      <button
        onClick={() => console.log("Tomorrow clicked")}
        className="flex items-center space-x-4 hover:bg-stone-200 transition-colors rounded-md px-3 py-2 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <span className="text-md font-medium text-gray-700 hover:text-black">
            Tomorrow
          </span>
          <span className="text-xs text-neutral-500 hover:text-black">
            Sep 22
          </span>
        </div>
        <MdArrowForwardIos size={24} />
      </button>
    </div>
  );
}
