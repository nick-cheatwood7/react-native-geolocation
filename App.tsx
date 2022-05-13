import React from 'react';
import {Icon, NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';

// Import screens
import {RootTabParamList} from './src/routes/RootTabParamList';
import HomeScreen from './src/views/HomeScreen';
import InfoScreen from './src/views/InfoScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName = '';
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Info') {
                iconName = focused
                  ? 'information-circle'
                  : 'information-circle-outline';
              }
              // Render the icon
              return (
                <Icon as={Ionicon} name={iconName} color={color} size={size} />
              );
            },
            tabBarActiveTintColor: '#0284c7',
            tabBarInactiveTintColor: '#a8a29e',
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Info" component={InfoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
