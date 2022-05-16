import React from 'react';
import {Icon, NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Button} from './src/constants/theme';

// Redux stuff
import {store} from './src/redux/store';
import {Provider} from 'react-redux';

// Import screens
import {RootTabParamList} from './src/routes/RootTabParamList';
import HomeScreen from './src/views/HomeScreen';
import RecentsScreen from './src/views/RecentsScreen';
import InfoScreen from './src/views/InfoScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName = '';
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Recents') {
                  iconName = focused ? 'location' : 'location-outline';
                } else if (route.name === 'Info') {
                  iconName = focused
                    ? 'information-circle'
                    : 'information-circle-outline';
                }
                // Render the icon
                return (
                  <Icon
                    as={Ionicon}
                    name={iconName}
                    color={color}
                    size={size}
                  />
                );
              },
              tabBarActiveTintColor: Button.Primary,
              tabBarInactiveTintColor: Button.Muted,
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Recents" component={RecentsScreen} />
            <Tab.Screen name="Info" component={InfoScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
