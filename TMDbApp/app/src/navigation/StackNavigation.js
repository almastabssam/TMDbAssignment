import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieDetailScreen from "../containers/screens/MovieDetailScreen";
import LatestMovies from "../containers/tabs/LatestMovies";

const HomeStack = createNativeStackNavigator();
const HomeStackScreen=()=> {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen   options={{
                headerShown: false,
            }} name="Latest Movies" component={LatestMovies} />
            <HomeStack.Screen name="Details" component={MovieDetailScreen} />
        </HomeStack.Navigator>
    );
}
export default HomeStackScreen;
