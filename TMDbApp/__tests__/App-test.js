/**
 * @format
 */
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import APIService from "../app/src/api";
import NoRecordFound from "../app/src/containers/components/NoRecordFound";

describe('Test Render Component Correctly', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NoRecordFound />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe('Test Latest APIs to avoid app crash', () => {
  it('Test API Required Keys', async () => {
    let data = await APIService.getLatestMovies(1);
    expect(true).toEqual(data.results.length?true:false);
    expect(data.results[0]).toHaveProperty('title');
    expect(data.results[0]).toHaveProperty('backdrop_path');
    expect(data.results[0]).toHaveProperty('poster_path');
    expect(data.results[0]).toHaveProperty('overview');
  });
});
describe('Test Movie Detail APIs to avoid app crash', () => {
  it('Test Deatil API Required Keys', async () => {
    let data = await APIService.getMovieDetail(615904);
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('backdrop_path');
    expect(data).toHaveProperty('poster_path');
    expect(data).toHaveProperty('overview');
  });
});
