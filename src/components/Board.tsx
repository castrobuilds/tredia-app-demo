import Column from "./Column";

export default function Board() {
  return (
    <main className="p-6 bg-slate-100">
      <div className="w-full mx-auto h-screen">
        <div className="flex flex-col items-center space-y-6 h-full">
          <div className="grid grid-cols-3 gap-4">
            {["yesterday", "today", "tomorrow"].map((col) => (
              <Column key={col} column={col as any} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
