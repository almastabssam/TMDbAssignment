import React, {Component, Fragment, useEffect, useState} from 'react';
import {
    Text, View, ScrollView, ActivityIndicator, StyleSheet
} from 'react-native';
import FastImage from "react-native-fast-image";
import {IMAGE_URL} from "../../../config/AppConfig";
import APIService from "../../api";
import Colors from "../../../config/Colors";
import NoRecordFound from "../components/NoRecordFound";

const MovieDetailScreen = ({route, navigation}) => {
    const {id} = route.params;
    const [loader, showLoader] = useState(false);
    const [listData, setListData] = useState({});
    useEffect(() => {
            getMovieDetail(id);
        }, []
    );
    let getMovieDetail = (id) => {
        showLoader(true);
        APIService.getMovieDetail(id).then(response => {
            console.log('response');
            console.log(response);
            showLoader(false);
            if (response) {
                setListData(response);
            }
        }).catch(error => {
            showLoader(false);
            console.log('error');
            console.log(error);
        });
    }
    return (
        <ScrollView style={styles.rootContainer}>
            {loader ? <ActivityIndicator size="large" color={Colors.green}/> : null}
            {Object.keys(listData).length > 0 ?
                <View style={styles.rootContainer}>
                    <View style={{height: 200}}>
                        <FastImage
                            style={styles.image}
                            source={{
                                uri: IMAGE_URL + listData.backdrop_path,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.rowContainer}>
                            <Text
                                style={styles.textTitle}
                                numberOfLines={1}>
                                {'Title:'}
                            </Text>
                            <Text
                                style={styles.text}
                                ellipsizeMode="tail"
                                numberOfLines={1}>
                                {listData.title}
                            </Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text
                                style={styles.textTitle}
                                numberOfLines={1}>
                                {'Release Date:'}
                            </Text>
                            <Text
                                style={styles.text}
                                numberOfLines={1}>
                                {listData.release_date}
                            </Text>
                        </View>

                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.rowContainer}>
                            <Text
                                style={styles.textTitle}
                                numberOfLines={1}>
                                {'Budget:'}
                            </Text>
                            <Text
                                style={styles.text}
                                numberOfLines={1}>
                                {listData.budget}
                            </Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text
                                style={styles.textTitle}
                                numberOfLines={1}>
                                {'Revenue:'}
                            </Text>
                            <Text
                                style={styles.text}
                                numberOfLines={1}>
                                {listData.revenue}
                            </Text>
                        </View>

                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.rowContainer}>
                            <Text
                                style={styles.textTitle}
                                numberOfLines={1}>
                                {'Duration:'}
                            </Text>
                            <Text
                                style={styles.text}
                                numberOfLines={1}>
                                {listData.runtime}
                            </Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text
                                style={styles.textTitle}
                                numberOfLines={1}>
                                {'Status:'}
                            </Text>
                            <Text
                                style={styles.text}
                                numberOfLines={1}>
                                {listData.status}
                            </Text>
                        </View>

                    </View>
                    <View style={{padding: 10, marginTop: 10}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text
                                style={styles.textTagLine}
                                numberOfLines={1}>
                                {'Tagline:'}
                            </Text>
                            <Text
                                style={styles.textTagColor}>
                                {listData.tagline}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text
                                style={styles.textTagLine}
                                numberOfLines={1}>
                                {'Overview:'}
                            </Text>
                            <Text
                                style={styles.textTagColor}>
                                {listData.overview}
                            </Text>
                        </View>

                    </View>
                </View> : <NoRecordFound/>}

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    circleRootContainer: {
        alignItems: 'center'
    },
    image: {
        width: '100%', height: '100%'
    },
    imageContainer: {
        borderRadius: 10, height: 250, width: 300, overflow: 'hidden'
    },
    textContainer: {
        flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginTop: 10
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 15,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        marginLeft: 5,
        color: Colors.black,
        fontWeight: 'bold',
        width: 100,
    },
    textTagLine: {
        fontSize: 15, textAlign: 'left'
    },
    textTagColor: {
        fontSize: 15, color: Colors.black
    },
    rowContainer: {
        flexDirection: 'row',
    }
});
export default MovieDetailScreen;
