import React, {useEffect, useState} from 'react';
import {Box, Center, Fab, Icon, useToast} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Map from '../../components/Map';
import {Button} from '../../constants/theme';

// Redux
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {setOrigin} from '../../redux/reducers/locationSlice';

// Location tracking
import useTracking from '../../utils/useTracking';

const Home: React.FC = () => {
  const [trackLocation, toggleTracking] = useState<boolean>(false);
  const toast = useToast();
  const origin = useAppSelector(state => state.location.origin);
  const dispatch = useAppDispatch();
  const {location, history} = useTracking(trackLocation);

  useEffect(() => {
    setCurrentLocation();
    // console.log(location);
    console.log('[REDUX]: ', origin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  // Fetch and set user's current location
  const setCurrentLocation = async (): Promise<void> => {
    // Get current location
    const current = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    // Set current location in Redux
    dispatch(
      setOrigin({latitude: current.latitude, longitude: current.longitude}),
    );
  };

  // TODO: Allow user to re-center the map
  const recenterMap = async (): Promise<void> => {
    // TODO: Remove later
    const enabled = !trackLocation;
    toggleTracking(enabled);
    // Alert user location is being fetched
    // toast.show({
    //   title: 'Fetching current location',
    //   placement: 'top',
    // });
    toast.show({
      title: `Background Location: ${enabled ? 'Enabled' : 'Disabled'}`,
      placement: 'top',
    });
    // Recenter map
    await setCurrentLocation();
  };

  return (
    <Center flex={1} ml={0} mr={0}>
      <Box flex={1} alignItems={'center'} justifyContent="center">
        {/* Render the map */}
        <Map latitude={origin?.latitude} longitude={origin?.longitude} />
        {/* Render a FAB */}
        <Fab
          renderInPortal={false}
          backgroundColor={Button.Primary}
          shadow={2}
          size="sm"
          icon={
            <Icon color="white" as={Ionicons} name="locate-outline" size={6} />
          }
          onPress={() => recenterMap()}
        />
      </Box>
    </Center>
  );
};

export default Home;
