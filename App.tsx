import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StateProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './src/app/store';
import ContactsScreen from './src/views/ContactsScreen';
import HomeScreen from './src/views/HomeScreens';
import SettingsScreen from './src/views/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
   const [isDarkModeOn, setIsDarkModeOn] = useState(store.getState().settings.isDarkModeOn);

   useEffect(() => {
      const unsubscribe = store.subscribe(() => {
         setIsDarkModeOn(store.getState().settings.isDarkModeOn);
      });

      return () => unsubscribe();
   }, []);

   return (
      <StateProvider store={store}>
         <PaperProvider theme={isDarkModeOn ? DarkTheme : DefaultTheme}>
            <NavigationContainer>
               <Tab.Navigator initialRouteName="Home">
                  <Tab.Screen
                     name="Home"
                     component={HomeScreen}
                     options={{
                        tabBarIcon: ({ color, size }) => (
                           <Ionicons name={'home'} size={size} color={color} />
                        ),
                     }}
                  />
                  <Tab.Screen
                     name="Contacts"
                     component={ContactsScreen}
                     options={{
                        tabBarIcon: ({ color, size }) => (
                           <Ionicons name={'people'} size={size} color={color} />
                        ),
                     }}
                  />
                  <Tab.Screen
                     name="Settings"
                     component={SettingsScreen}
                     options={{
                        tabBarIcon: ({ color, size }) => (
                           <Ionicons name={'settings'} size={size} color={color} />
                        ),
                     }}
                  />
               </Tab.Navigator>
            </NavigationContainer>
         </PaperProvider>
      </StateProvider>
   );
}
