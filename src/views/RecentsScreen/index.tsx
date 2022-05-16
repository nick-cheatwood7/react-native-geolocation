import React, {useState, useEffect} from 'react';
import {Center, Text, VStack, Button} from 'native-base';
import db from '../../data';

const RecentsScreen = () => {
  const [locations, setLocations] = useState<any>([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const records = await db.locations.findUnsynced();
    setLocations(records ? records : []);
  };

  return (
    <Center flex={1} alignContent="center" justifyContent={'center'}>
      <VStack flex={1} alignContent="center" justifyContent={'center'}>
        <Text>RecentsScreen</Text>
        <Button onPress={fetchLocations}>Refresh</Button>
        <Text>{JSON.stringify(locations)}</Text>
      </VStack>
    </Center>
  );
};

export default RecentsScreen;
