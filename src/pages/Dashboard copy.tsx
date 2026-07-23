import { useEffect, useState } from "react";

import Header from "../components/Header";
import BusCard from "../components/BusCard";
import ImageCard from "../components/ImageCard";

import { getBuses, getLatestImage, captureImage } from "../services/busService";

export default function Dashboard() {
  const [buses, setBuses] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>();
  const [image, setImage] = useState<any>();

  async function load() {
    const busList = await getBuses();

    setBuses(busList);

    if (!selected && busList.length > 0) {
      setSelected(busList[0]);
    }

    if (selected) {
      const latest = await getLatestImage(selected.deviceId);

      setImage(latest);
    }
  }

  useEffect(() => {
    load();

    const timer = setInterval(load, 3000);

    return () => clearInterval(timer);
  }, [selected]);

  async function handleCapture() {
    if (!selected) return;

    await captureImage(selected.deviceId);

    alert("Capture Requested");
  }

  return (
    <div>
      <Header />

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: 300 }}>
          {buses.map((bus) => (
                      <BusCard key={bus.id} bus={bus} selected={selected?.id === bus.id} onClick={() => setSelected(bus)} />
          ))}
        </div>

        <div>
          {selected && (
            <>
              <h2>{selected.name}</h2>

              <button onClick={handleCapture}>Capture Image</button>

              <hr />

              <ImageCard image={image} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
