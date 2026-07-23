import { useEffect, useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CameraPanel from "../components/CameraPanel";

import { getBuses } from "../services/busService";
import type { BusDto } from "../types/Bus";

export default function Dashboard() {
  const [buses, setBuses] = useState<BusDto[]>([]);
  const [selectedBus, setSelectedBus] = useState<BusDto | null>(null);

  async function load() {
    try {
      const data = await getBuses();

      setBuses(data);

      if (data.length > 0) {
        setSelectedBus(data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    load();

    const timer = setInterval(load, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen bg-slate-950 text-white overflow-hidden">
      <Header />

      <div className="flex h-[calc(100vh-72px)]">
        <Sidebar
          buses={buses}
          selectedBus={selectedBus}
          onSelect={setSelectedBus}
        />

        <main className="flex-1 p-6">
          <CameraPanel bus={selectedBus} />
        </main>
      </div>
    </div>
  );
}
