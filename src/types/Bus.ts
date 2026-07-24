export interface BusStatus{
    online:boolean;
    lastSeen:string;
}

export interface LatestImage{
    imageUrl:string;
    capturedAt:string;
}

export interface BusDto {
  id: number;
  name: string;
  deviceId: string;
  isOnline: boolean;
  // ISO timestamp of when the bus was last seen / reported online
  lastSeen?: string | number | Date;
  imageUrl?: string;
  capturedAt?: string;
}