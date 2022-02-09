import React, {Component, Fragment, useEffect, useState} from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import APIService from "../../api";
import Spinner from 'react-native-loading-spinner-overlay';
import MovieListItem from "../components/MovieListItem";
import NoRecordFound from "../components/NoRecordFound";

const PopularMovies = () => {
    const [loader, showLoader] = useState(false);
    const [listData, setListData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
         getPopularMovies(currentPage)
        }, []
    );
    let getPopularMovies = (pageNo) =>{
        showLoader(true);
        APIService.getPopularMovies(pageNo).then(response => {
            showLoader(false);
            console.log('response');
            console.log(response);
            if (response.results && response.results.length) {
                if (listData.length) {
                    setListData([...listData, ...response.results]);
                } else {
                    setListData(response.results);
                }
            }
        }).catch(error => {
            showLoader(false);
            console.log('error');
            console.log(error);
        });
    }
    let loadMoreData = () => {
        let nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getPopularMovies(nextPage);
    }
    const renderItem = item => {
        return <MovieListItem item={item} />;
    };
    return (
        <View style={styles.rootContainer}>
            {loader?<ActivityIndicator size="large" color="#00ff00" />:null}
            {listData.length > 0 ? (
                <FlatList
                    style={styles.listContainer}
                    numColumns={2} // set number of columns
                    columnWrapperStyle={styles.row} // space them out evenly
                    data={listData}
                    keyExtractor={(item, index) => item.id + new Date()}
                    renderItem={({ item, index }) => renderItem(item)}
                    onEndReached={() => loadMoreData()}
                    onEndReachedThreshold={0.5}
                />
            ) : (
               <NoRecordFound />
            )}
        </View>
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

export default PopularMovies;
