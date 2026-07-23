import * as signalR from "@microsoft/signalr";

export const connection =
    new signalR.HubConnectionBuilder()
        .withUrl("http://192.168.0.105:5000/cameraHub")
        .withAutomaticReconnect()
        .build();