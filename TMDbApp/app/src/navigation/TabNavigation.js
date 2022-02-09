import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import PopularMovies from "../containers/tabs/PopularMovies";
import HomeStackScreen from "./StackNavigation";

const TabContainer = () => {
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen options={{
                    headerShown: false,
                }} name="Latest" component={HomeStackScreen} />
                <Tab.Screen options={{
                    headerShown: false,
                }} name="Popular" component={PopularMovies} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
export default TabContainer;
