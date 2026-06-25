import Column from "./Column";

export default function Board({
  activeId,
  overId,
}: {
  activeId: string | null;
  overId: string | null;
}) {
  return (
    <main className="p-6 bg-slate-100">
      <div className="w-full mx-auto h-screen">
        <div className="flex flex-col items-center space-y-6 h-full">
          <div className="w-full mx-auto bg-slate-200 rounded-lg shadow-lg p-3">
            <h1 className="text-2xl font-bold text-center">Tredia App</h1>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["yesterday", "today", "tomorrow"].map((col) => (
              <Column
                key={col}
                column={col as any}
                activeId={activeId}
                overId={overId}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
