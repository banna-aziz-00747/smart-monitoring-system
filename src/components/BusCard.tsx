import { Bus, Wifi, WifiOff, ChevronRight } from "lucide-react";
import type { BusDto } from "../types/Bus";

interface BusCardProps {
  bus: BusDto;
  selected?: boolean;
  onClick?: () => void;
}

export default function BusCard({
  bus,
  selected = false,
  onClick = () => {},
}: BusCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-2xl
        border
        transition-all
        duration-300
        text-left
        p-5
        ${
          selected
            ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
            : "border-slate-700 bg-slate-800 hover:border-slate-500 hover:bg-slate-750"
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`
              w-12
              h-12
              rounded-xl
              flex
              items-center
              justify-center
              ${selected ? "bg-blue-600" : "bg-slate-700"}
            `}
          >
            <Bus size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-white">{bus.name}</h3>

            <p className="text-sm text-slate-400 mt-1">{bus.deviceId}</p>
          </div>
        </div>

        <ChevronRight
          size={18}
          className={selected ? "text-blue-400" : "text-slate-500"}
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div
          className={`
            flex
            items-center
            gap-2
            text-sm
            ${bus.isOnline ? "text-green-400" : "text-red-400"}
          `}
        >
          {bus.isOnline ? (
            <>
              <Wifi size={16} />
              <span>Online</span>
            </>
          ) : (
            <>
              <WifiOff size={16} />
              <span>Offline</span>
            </>
          )}
        </div>

        <div className="text-xs text-slate-500">
          {bus.lastSeen ? new Date(bus.lastSeen).toLocaleTimeString() : "--"}
        </div>
      </div>
    </button>
  );
}
