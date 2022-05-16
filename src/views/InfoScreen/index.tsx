import React from 'react';
import {Alert} from 'react-native';
import {Box, Text, Button} from 'native-base';
import db from '../../data';

const InfoScreen = () => {
  const handlePress = async () => {
    await db.clear();
    Alert.alert('Database cleared successfully!');
  };

  return (
    <Box flex={1} alignItems={'center'} justifyContent="center">
      <Text>Info Screen</Text>
      <Button onPress={handlePress}>Clear Database</Button>
    </Box>
  );
};

export default InfoScreen;
