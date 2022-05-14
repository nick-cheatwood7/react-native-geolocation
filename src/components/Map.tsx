import React from 'react';
import MapView from 'react-native-maps';
import {Box} from 'native-base';
import {StyleSheet} from 'react-native';

const Map: React.FC = () => {
  return (
    <Box flex={1} flexDirection={'row'}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.container}
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
