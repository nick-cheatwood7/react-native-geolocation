import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <Box flex={1} alignItems={'center'} justifyContent="center">
        Hello world
      </Box>
    </NativeBaseProvider>
  );
};

export default App;
