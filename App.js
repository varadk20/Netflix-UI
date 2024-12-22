import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./pages/HomeScreen";
import DetailsScreen from "./pages/DetailsScreen";
import SearchScreen from "./pages/SearchScreen"; // Import SearchScreen
import { TouchableOpacity } from "react-native";


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Netflix",
            headerTitleStyle: { fontSize: 30 },
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "red",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Search")}
              >
                <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: "Show Details",
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: "Search Shows",
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
