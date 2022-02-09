import {Text, View} from "react-native";
import React from 'react';
let NoRecordFound =()=>{
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
                style={
                    {
                        height: 40,
                        width: '100%',
                        textAlign: 'center',
                        color: 'gray',
                        fontSize: 18,
                        alignSelf: 'center',
                    }}>
                No Record Found
            </Text>
        </View>
    );
}
export default NoRecordFound;
