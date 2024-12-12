import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/pages/HomeScreen";
import ListScreen from "./src/pages/ListScreen";

/*
[
        { id: 1, title: "Item 1", items: [] },
        {
            id: 2,
            title: "Item 2",
            items: [
                { id: 1, text: "banana", done: false },
                { id: 3, text: "maçã", done: true },
                { id: 5, text: "detergente", done: false },
            ],
        },
        { id: 3, title: "Item 3", items: [] },
        {
            id: 4,
            title: "Item 4",
            items: [
                { id: 2, text: "roupas", done: false },
                { id: 4, text: "sapatos", done: true },
            ],
        },
        { id: 5, title: "Item 5", items: [] },
    ]
*/

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="List" component={ListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
