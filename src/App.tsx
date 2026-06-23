import Column from "./components/Column";

export default function App() {
  return (
    <main className="p-6 bg-slate-100">
      <div className="w-full mx-auto h-screen">
        <div className="flex flex-col items-center space-y-6 h-full">
          <div className="w-full mx-auto bg-slate-200 rounded-lg shadow-lg p-3">
            <h1 className="text-2xl font-bold text-center">Tredia App</h1>
          </div>

          <div className="flex w-full mx-auto gap-6">
            <Column title="Yesterday" />
            <Column title="Today" />
            <Column title="Tomorrow" />
          </div>
        </div>
      </div>
    </main>
  );
}
