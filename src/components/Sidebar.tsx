import type { BusDto } from "../types/Bus";
import BusCard from "./BusCard";

interface SidebarProps {
  buses: BusDto[];
  selectedBus: BusDto | null;
  onSelect: (bus: BusDto) => void;
}

export default function Sidebar({
  buses,
  selectedBus,
  onSelect,
}: SidebarProps) {
  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold">Fleet</h2>

        <p className="text-sm text-slate-400 mt-1">
          {buses.length} Bus{buses.length !== 1 ? "es" : ""}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {buses.length === 0 ? (
          <div className="text-center text-slate-500 mt-10">
            No buses found.
          </div>
        ) : (
          buses.map((bus) => (
            <BusCard
              key={bus.id}
              bus={bus}
              selected={selectedBus?.id === bus.id}
              onClick={() => onSelect(bus)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
