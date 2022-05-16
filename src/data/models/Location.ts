import uuid from 'react-native-uuid';

export interface LocationOptions {
  timestamp: number;
  latitude: number;
  longitude: number;
}

export default class Location {
  readonly id: string;
  readonly deviceId: string;
  public timestamp: number;
  public latitude: number;
  public longitude: number;
  public isSynced: boolean;

  constructor(props: LocationOptions) {
    this.id = uuid.v4() as string;
    this.deviceId = '';
    this.timestamp = props.timestamp;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.isSynced = false;
  }

  toggleSynced() {
    this.isSynced = !this.isSynced;
    return this.toJSON();
  }

  toJSON() {
    return {
      id: this.id,
      deviceId: this.deviceId || null,
      timestamp: this.timestamp,
      latitude: this.latitude,
      longitude: this.longitude,
      isSynced: this.isSynced,
    };
  }
}
