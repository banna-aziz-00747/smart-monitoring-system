import { Camera, Clock3, Wifi, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import type { BusDto } from "../types/Bus";
import { connection } from "../services/signalr";

interface Props {
  bus: BusDto | null;
}

const API = "http://192.168.0.105:5000";

export default function CameraPanel({ bus }: Props) {
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(
    bus?.imageUrl ? `${API}${bus.imageUrl}?t=${Date.now()}` : null,
  );
  // useEffect(() => {
  //   connection.on("ImageUploaded", (data) => {
  //     console.log(data);
  //   });
  // }, []);

  useEffect(() => {
    if (bus?.imageUrl) {
      setCurrentImage(`${API}${bus.imageUrl}?t=${Date.now()}`);
    } else {
      setCurrentImage(null);
    }
  }, [bus]);

  useEffect(() => {
    const handler = (data: any) => {
      console.log("SignalR Event:", data);

      if (data.deviceId !== bus?.deviceId) return;

      setCurrentImage(`${API}${data.imageUrl}?t=${new Date().getTime()}`);
    };

    connection.on("ImageUploaded", handler);

    return () => {
      connection.off("ImageUploaded", handler);
    };
  }, [bus]);

  async function capture() {
    if (!bus) return;

    setLoading(true);

    try {
      await axios.post(`${API}/api/camera/request`, {
        deviceId: bus.deviceId,
      });

      // setTimeout(() => {
      //   window.location.reload();
      // }, 4000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (!bus) {
    return (
      <div className="h-full rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center">
        <p className="text-slate-500 text-lg">Select a bus</p>
      </div>
    );
  }

  // const imageUrl = bus.imageUrl ? `${bus.imageUrl}?t=${Date.now()}` : null;
  return (
    <div className="h-full rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col">
      {/* Header */}

      <div className="border-b border-slate-800 px-8 py-5 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{bus.name}</h2>

          <div className="flex gap-6 mt-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Camera size={16} />
              {bus.deviceId}
            </div>

            <div className="flex items-center gap-2">
              <Wifi
                size={16}
                className={bus.isOnline ? "text-green-400" : "text-red-400"}
              />

              {bus.isOnline ? "Online" : "Offline"}
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={16} />

              {bus.lastSeen ? new Date(bus.lastSeen).toLocaleString() : "--"}
            </div>
          </div>
        </div>

        <button
          onClick={capture}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          Capture
        </button>
      </div>

      {/* Camera */}

      <div className="flex-1 bg-black flex items-center justify-center">
        {currentImage ? (
          <img
            src={currentImage}
            className="w-full h-full object-contain"
            alt=""
          />
        ) : (
          <div className="text-center">
            <Camera size={70} className="mx-auto text-slate-700" />

            <p className="mt-5 text-slate-500 text-lg">
              Waiting for first image...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
