import axios from "axios";

const API = "http://192.168.0.105:5000";

export async function getLatestImage(deviceId: string) {
    const res = await axios.get(
        `${API}/api/camera/latest/${deviceId}`
    );

    return res.data;
}

export async function captureImage(deviceId: string) {

    const res = await axios.post(
        API + "/api/camera/capture",
        {
            deviceId
        });

    return res.data;
}

export async function getCaptureStatus(id:number){

    const res=await axios.get(
        API+"/api/camera/capture-status/"+id
    );

    return res.data;
}