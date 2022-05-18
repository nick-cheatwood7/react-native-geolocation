// Based on the `useTracking` hook provided by @jonasgroendahl on GitHub
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import {getDistanceFromLatLonInKm} from './getDistance';
import db from '../data';

interface Location {
  timestamp: number;
  latitude: number;
  longitude: number;
}

const defaultLocation: Location = {
  timestamp: 0,
  latitude: 123,
  longitude: 456,
};

const useTracking = (isActive: boolean) => {
  const [location, setLocation] = useState(defaultLocation);
  const [history, setHistory] = useState<Location[]>([]);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 5,
      distanceFilter: 5,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      notificationsEnabled: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      saveBatteryOnBackground: true,
      debug: false,
    });

    BackgroundGeolocation.on('location', loc => {
      console.log('[LOCATION]: ', loc);
      setLocation(prev => ({
        ...prev,
        timestamp: loc.time,
        latitude: loc.latitude,
        longitude: loc.longitude,
      }));

      // Set history (if applicable)
      setHistory(prev => {
        setDistance(prevDistance => {
          if (prev.length === 0) {
            return 0;
          }
          const latestItem = prev[prev.length - 1];
          return (
            prevDistance +
            getDistanceFromLatLonInKm(
              latestItem.latitude,
              latestItem.longitude,
              location.latitude,
              location.longitude,
            )
          );
        });

        return prev.concat({
          timestamp: location.timestamp,
          latitude: location.latitude,
          longitude: location.longitude,
        });
      });

      // Start background task (write to storage or send to graphql)
      BackgroundGeolocation.startTask(async taskKey => {
        // Execute long running task here
        console.log(`Task "${taskKey}" started...`);
        // TODO: Save location reading to db
        const newLocation = await db.locations.create({
          timestamp: location.timestamp,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        await db.locations.save(newLocation);
        console.log(
          `[INFO (${new Date().toLocaleString()})]: `,
          JSON.stringify(newLocation),
        );
        // IMPORTANT: Must `end` task
        BackgroundGeolocation.endTask(taskKey);
        console.log('Task ended.');
      });
    });

    BackgroundGeolocation.on('stationary', stationaryLocation => {
      // Handle stationary locations here
      console.log('[INFO]: Stationary location: ', stationaryLocation);
    });

    BackgroundGeolocation.on('error', err => {
      // Handle errors here
      console.error('BackgroundGeolocation encountered an error');
      console.error(err);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO]: ', 'BackgroundGeolocation service has started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO]: ', 'BackgroundGeolocation service has stopped');
    });

    // TODO: Prompts user every time app is launched
    BackgroundGeolocation.on('authorization', status => {
      console.log(
        '[INFO]: ',
        `BackgroundGeolocation authorization status: ${status}`,
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // Set a delay or else alert may not be shown
        setTimeout(() => {
          Alert.alert(
            'App requires location tracking permission',
            'Would you like to open app settings?',
            [
              {
                text: 'Settings...',
                onPress: () => BackgroundGeolocation.showAppSettings(),
              },
              {
                text: 'No',
                onPress: () => console.log('No pressed'),
                style: 'cancel',
              },
            ],
          );
          1000;
        });
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO]: ', 'App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO]: ', 'App is in foreground');
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log(
        '[INFO]: BackgroundGeolocation service is running? ',
        status.isRunning,
      );
      console.log(
        '[INFO]: BackgroundGeolocation services enabled? ',
        status.locationServicesEnabled,
      );
      console.log(
        '[INFO]: BackgroundGeolocation auth status: ',
        status.authorization,
      );

      // You don't have to check the status before start, but you can
      if (!status.isRunning) {
        BackgroundGeolocation.start();
      }
    });

    return () => {
      console.log('Removing all listeners');
      BackgroundGeolocation.removeAllListeners();
    };
  }, [location, isActive]);

  return {location, history, distance};
};

export default useTracking;
