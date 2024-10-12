import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import ViewAssignmentScreen from "./screens/ViewAssignment";
import AssignmentScreen from "./screens/AssignmentScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewAssignment"
          component={ViewAssignmentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AssignmentScreen"
          component={AssignmentScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
