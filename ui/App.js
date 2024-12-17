import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OpeningScreen from "./components/OpenScreen";
import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import PersonalDetails from "./components/PersonalDetails";
import Questions from "./components/Questions";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="OpeningScreen"
          component={OpeningScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />
          <Stack.Screen
          name="personal-details"
          component={PersonalDetails}
        />
            <Stack.Screen
          name="questions"
          component={Questions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
