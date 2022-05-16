import Location, {LocationOptions} from '../models/Location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATIONS_KEY = '@locations';

export default class LocationController {
  public async create({
    timestamp,
    latitude,
    longitude,
  }: LocationOptions): Promise<Location> {
    const location = new Location({
      timestamp,
      latitude,
      longitude,
    }).toJSON();
    return JSON.parse(JSON.stringify(location));
  }

  public async save(location: Location): Promise<void> {
    const prev = await this.findAll();
    prev.push(location);
    try {
      await AsyncStorage.setItem(LOCATIONS_KEY, JSON.stringify(prev));
    } catch (err) {
      console.error(err);
    }
  }

  public async markAsSynced(id: string): Promise<Location | null> {
    let updatedLocation: Location | null = null;
    const records = await this.findAll();
    records.forEach(location => {
      if (location.id === id) {
        location.isSynced = true;
        updatedLocation = location;
      }
    });
    try {
      await AsyncStorage.setItem(LOCATIONS_KEY, JSON.stringify({...records}));
    } catch (err) {
      console.error(err);
    }
    return updatedLocation;
  }

  public async findAll(): Promise<Location[]> {
    let locations: any = null;
    try {
      locations = await AsyncStorage.getItem(LOCATIONS_KEY);
    } catch (err) {
      console.error(err);
    }
    const data = locations ? JSON.parse(locations) : [];
    return data;
  }

  public async findUnsynced(): Promise<Location[]> {
    const allLocations = await this.findAll();
    const filteredItems = allLocations.filter(location => {
      return !location.isSynced;
    });
    return filteredItems;
  }

  public async deleteAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(LOCATIONS_KEY);
    } catch (err) {
      console.error(err);
    }
  }
}
