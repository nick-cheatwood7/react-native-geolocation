import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const defaultLocation = {
  latitude: 123,
  longitude: 456,
};

const useTracking = (isActive: boolean) => {
  const [location, setLocation] = useState(defaultLocation);
  // const [history, setHistory] = useState<any>([]);
  // const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      url: 'http://localhost:5000/graphql',
      httpHeaders: {
        'X-FOO': 'bar',
      },
      // Customize POST properties
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        foo: 'bar',
      },
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

      // Start background task (write to storage or send to graphql)
      BackgroundGeolocation.startTask(taskKey => {
        // Execute long running task here
        // IMPORTANT: Must `end` task
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('stationary', stationaryLocation => {
      // Handle stationary locations here
      console.log('[INFO]: Stationary location: ', stationaryLocation);
    });

    BackgroundGeolocation.on('error', err => {
      // Handle errors here
      console.error(err);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO]: ', 'BackgroundGeolocation service has started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO]: ', 'BackgroundGeolocation service has stopped');
    });

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
                text: 'Yes',
                onPress: () => BackgroundGeolocation.showAppSettings(),
              },
              {
                text: 'No',
                onPress: () => console.log('No pressed'),
                style: 'cancel',
              },
            ],
          ),
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

  // return {location, history, distance};
  return {location};
};

export default useTracking;
