import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import ContactsScreen from "./src/views/ContactsScreen";
import HomeScreen from "./src/views/HomeScreens";
import SettingsScreen from "./src/views/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"home"} size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Contacts"
            component={ContactsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"people"} size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"settings"} size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
