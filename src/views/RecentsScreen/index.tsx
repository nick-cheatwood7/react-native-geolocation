/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Center,
  Text,
  VStack,
  Box,
  HStack,
  Icon,
  Fab,
  FlatList,
  useToast,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button as ButtonTheme} from '../../constants/theme';
import db from '../../data';
import Location from '../../data/models/Location';

interface IItem {
  title: string;
  subtitle?: string;
}

const RecentsScreen = () => {
  const [locations, setLocations] = useState<any>([]);
  const toast = useToast();

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const records = await db.locations.findUnsynced();
    setLocations(records ? records : []);
  };

  const refreshList = async () => {
    toast.show({
      title: 'Refreshing Location list...',
      placement: 'top',
    });
    await fetchLocations();
  };

  const Item = ({title, subtitle}: IItem) => (
    <Box borderBottomWidth={1} pl={4} pr={5} py={2} borderColor="coolGray.200">
      <HStack space={3} justifyContent="space-between">
        <VStack>
          <Text color="warmGray.800">{title}</Text>
          <Text color="warmGray.400">{subtitle}</Text>
        </VStack>
      </HStack>
    </Box>
  );

  const renderItem = ({item}: {item: Location}) => {
    const timestamp = new Date(item.timestamp).toLocaleString();
    return (
      <Item
        title={`(${JSON.stringify(item.latitude)}, ${JSON.stringify(
          item.longitude,
        )})`}
        subtitle={`${timestamp} • Synced: ${JSON.stringify(item.isSynced)}`}
      />
    );
  };

  return (
    <Center flex={1}>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor={'white'}>
        <FlatList
          flex={1}
          data={[...locations.reverse()]}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          alignSelf="flex-start"
          // flexDirection={'column'}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            minWidth: '100%',
          }}
          ListFooterComponent={
            <Center flex={1}>
              <Text
                padding={6}
                fontSize={16}
                color={'warmGray.400'}
                alignContent={'center'}>
                End of list
              </Text>
            </Center>
          }
        />
        <Fab
          backgroundColor={ButtonTheme.Primary}
          renderInPortal={false}
          icon={
            <Icon
              shadow={2}
              color="white"
              as={Ionicons}
              name="refresh"
              size="lg"
            />
          }
          onPress={refreshList}
        />
      </Box>
    </Center>
  );
};

export default RecentsScreen;
