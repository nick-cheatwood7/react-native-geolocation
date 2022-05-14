import React from 'react';
import {Box, Center, Fab, Icon, useToast} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Map from '../../components/Map';
import {Button} from '../../constants/theme';

const Home: React.FC = () => {
  const toast = useToast();
  return (
    <Center flex={1} ml={0} mr={0}>
      <Box flex={1} alignItems={'center'} justifyContent="center">
        {/* Render the map */}
        <Map />
        {/* Render a FAB */}
        <Fab
          renderInPortal={false}
          backgroundColor={Button.Primary}
          shadow={2}
          size="sm"
          icon={
            <Icon color="white" as={Ionicons} name="locate-outline" size={6} />
          }
          onPress={() =>
            toast.show({
              title: 'Fetching current location',
              placement: 'top',
            })
          }
        />
      </Box>
    </Center>
  );
};

export default Home;
