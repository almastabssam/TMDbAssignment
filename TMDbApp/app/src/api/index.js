import request from "../helpers/NetworkHelper";

function getLatestMovies(pageNo) {
    return request({
        url: '/movie/upcoming?page='+pageNo,
        method: 'GET',
    });
}
function getPopularMovies() {
    return request({
        url: '/movie/popular',
        method: 'GET',
    });
}
function getMovieDetail(id) {
    return request({
        url: '/movie/'+id,
        method: 'GET',
    });
}
let APIService={
    getLatestMovies,
    getPopularMovies,
    getMovieDetail
};

export default APIService;
