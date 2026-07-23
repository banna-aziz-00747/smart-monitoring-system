import { Bus, Wifi, Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="h-[70px] border-b border-slate-800 bg-slate-900 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-3 rounded-xl">
          <Bus size={24} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Fleet Monitoring System</h1>

          <p className="text-slate-400">Live Bus Camera Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Wifi className="text-green-500 animate-pulse" size={18} />
          Backend Connected
        </div>

        <Bell />

        <Settings />
      </div>
    </header>
  );
}
