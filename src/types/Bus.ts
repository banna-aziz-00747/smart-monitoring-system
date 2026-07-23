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
  imageUrl?: string;
  capturedAt?: string;
}