import { useEffect, useState } from "react";
import { Camera, Clock, Wifi } from "lucide-react";
import {
  captureImage,
  getCaptureStatus,
  getLatestImage,
} from "../services/cameraService";

interface Props {
  deviceId: string;
  busName: string;
}

const API = "http://192.168.0.105:5000";

export default function CameraViewer({ deviceId, busName }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const [capturedAt, setCapturedAt] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadLatestImage() {
    try {
      const data = await getLatestImage(deviceId);

      // prevent browser cache
      setImageUrl(API + data.imageUrl + "?t=" + new Date().getTime());

      setCapturedAt(data.capturedAt);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCapture() {
    setLoading(true);

    const result = await captureImage(deviceId);

    const requestId = result.requestId;

    waitUntilCaptured(requestId);
  }

  async function waitUntilCaptured(requestId: number) {
    const timer = setInterval(async () => {
      const status = await getCaptureStatus(requestId);

      if (status.captured) {
        clearInterval(timer);

        await loadLatestImage();

        setLoading(false);
      }
    }, 1000);
  }

  useEffect(() => {
    loadLatestImage();

    const timer = setInterval(() => {
      loadLatestImage();
    }, 2000);

    return () => clearInterval(timer);
  }, [deviceId]);

  return (
    <div className="flex-1 p-8 bg-slate-900 overflow-auto">
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">{busName}</h2>

          <p className="text-slate-400 mt-1">Live Camera Monitor</p>
        </div>

        <button
          onClick={handleCapture}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all text-white font-semibold shadow-lg disabled:bg-slate-600"
        >
          <button
            className="
bg-blue-600
hover:bg-blue-500
px-8
py-3
rounded-xl
flex
items-center
gap-3"
          >
            {loading ? (
              <>
                <div
                  className="
w-5
h-5
border-2
border-white
border-t-transparent
rounded-full
animate-spin"
                />
                Capturing...
              </>
            ) : (
              "Capture Image"
            )}
          </button>
        </button>
      </div>

      {/* Camera */}

      <div className="rounded-2xl overflow-hidden border border-slate-700 bg-black shadow-2xl">
        {imageUrl ? (
          <img
            src={imageUrl}
            className="w-full h-[600px] object-contain bg-black transition-all duration-500"
          />
        ) : (
          <div className="h-[600px] flex items-center justify-center text-slate-500">
            No Image
          </div>
        )}
      </div>

      {/* Info */}

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <Camera size={20} className="text-blue-400" />

            <span className="text-slate-400">Device</span>
          </div>

          <p className="text-white font-semibold text-lg">{deviceId}</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={20} className="text-yellow-400" />

            <span className="text-slate-400">Last Capture</span>
          </div>

          <p className="text-white">
            {capturedAt ? new Date(capturedAt).toLocaleString() : "-"}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <Wifi size={20} className="text-green-400" />

            <span className="text-slate-400">Status</span>
          </div>

          <p className="text-green-400 font-semibold">Online</p>
        </div>
      </div>
    </div>
  );
}
