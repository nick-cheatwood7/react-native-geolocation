import React from 'react';
import {Icon, NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';

// Import screens
import HomeScreen from './src/views/HomeScreen';
import InfoScreen from './src/views/InfoScreen';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName: typeof Icon.name = '';
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
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Info" component={InfoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
