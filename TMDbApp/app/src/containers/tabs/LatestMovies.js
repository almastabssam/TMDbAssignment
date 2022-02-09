import React, {Component, Fragment, useEffect, useState} from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet, ActivityIndicator
} from 'react-native';
import APIService from "../../api";
import MovieListItem from "../components/MovieListItem";
import Colors from "../../../config/Colors";
import NoRecordFound from "../components/NoRecordFound";

const LatestMovies = () => {
    const [loader, setShowLoader] = useState(true);
    const [listData, setListData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
            getLatestMovies(currentPage)
        }, []
    );
    let getLatestMovies = (pageNo) => {
        setShowLoader(true);
        APIService.getLatestMovies(pageNo).then(response => {
            console.log('response');
            console.log(response);
            setShowLoader(false);
            if (response.results && response.results.length) {
                if (listData.length) {
                    setListData([...listData, ...response.results]);
                } else {
                    setListData(response.results);
                }

            }
        }).catch(error => {
            setShowLoader(false);
            console.log('error');
            console.log(error);
        });
    }
    let lodeMoreData = () => {
        let nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getLatestMovies(nextPage);
    }
    const renderItem = item => {
        return <MovieListItem item={item}/>;
    };
    return (
        <Fragment>
            {loader ? <ActivityIndicator size="large" color={Colors.green}/> : null}
            <View style={styles.rootContainer}>
                {listData.length > 0 ? (
                    <FlatList
                        style={styles.listContainer}
                        numColumns={2} // set number of columns
                        columnWrapperStyle={styles.row} // space them out evenly
                        data={listData}
                        keyExtractor={(item, index) => item.id + new Date()}
                        renderItem={({item, index}) => renderItem(item)}
                        onEndReached={() => lodeMoreData()}
                        onEndReachedThreshold={0.5}
                    />
                ) : (
                    <NoRecordFound />
                )}

            </View>
        </Fragment>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    listContainer: {
        marginTop: 10,
        flex: 1,
        height: '100%',
        width: '100%',
    },
});

export default LatestMovies;
