import React from 'react';
import MapView from 'react-native-maps';
import {Box} from 'native-base';
import {StyleSheet} from 'react-native';

interface IProps {
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

const Map: React.FC<IProps> = ({
  latitude = 37.78825,
  longitude = -122.4324,
  latitudeDelta = 0.005,
  longitudeDelta = 0.005,
}: IProps) => {
  return (
    <Box flex={1} flexDirection={'row'}>
      <MapView
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        style={styles.container}
        showsCompass
        showsUserLocation
        followsUserLocation
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});

export default Map;
