import React, {useState, useEffect} from 'react';
import {Box, Text} from 'native-base';

// Database
import {useDatabaseConnection} from '../../data/connection';

const InfoScreen = () => {
  const {locationsRepository} = useDatabaseConnection();
  const [records, setRecords] = useState<any>([]);

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRecords = async (): Promise<void> => {
    await locationsRepository.deleteAll();
    const data = await locationsRepository.getAll();
    setRecords(data);
  };

  return (
    <Box flex={1} alignItems={'center'} justifyContent="center">
      <Text>Info Screen</Text>
      <Text>{JSON.stringify(records)}</Text>
    </Box>
  );
};

export default InfoScreen;
