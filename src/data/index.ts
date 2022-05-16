import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationController from './controllers/LocationController';

const database = {
  locations: new LocationController(),
  clear: async () => await AsyncStorage.clear(),
};

export default database;
