import { RxArchive, RxDotsHorizontal } from "react-icons/rx";

export default function NavBar() {
  return (
    <nav className="bg-stone-100 py-4 shadow-md border-b border-stone-200">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-gray-800 text-lg font-bold">TREDIA</h1>
        <div className="flex items-center space-x-6">
          <button className="rounded-full hover:bg-stone-200 transition-colors cursor-pointer">
            <RxArchive size={22} />
          </button>
          <button className=" rounded-full hover:bg-stone-200 transition-colors cursor-pointer">
            <RxDotsHorizontal size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
