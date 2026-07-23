import api from "../api/api";

export const getBuses = async () => {
    const res = await api.get("/bus");
    return res.data;
};

export const getStatus = async (deviceId: string) => {
    const res = await api.get(`/bus/status?deviceId=${deviceId}`);
    return res.data;
};

export const getLatestImage = async (deviceId: string) => {
    const res = await api.get(`/camera/latest?deviceId=${deviceId}`);
    return res.data;
};

export const captureImage = async (deviceId: string) => {
    await api.post("/camera/capture", {
        deviceId
    });
};