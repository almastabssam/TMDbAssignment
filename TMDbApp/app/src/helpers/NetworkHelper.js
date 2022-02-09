/* istanbul ignore file */
import axios from 'axios';
import {Alert, Platform} from 'react-native';
import {API_TOKEN, BASE_URL} from "../../config/AppConfig";

/**
 * Request Wrapper with default success/error actions
 */
const request = async function (options) {
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: 'text/plain,application/json',
      'Content-Type': 'application/json, multipart/form-data',
      Authorization: 'Bearer '+ API_TOKEN,
    },
  });

  const onSuccess = function (response) {
    const {status} = response;
    if (status === 200) {
      return response.data;
    }
  };

  const onError = async function (error) {
    if (error && error.response && error.response.status) {
      // Request was made but server responded with something
      // other than 2xx
      if (error.response.status === 401) {
        console.log('intercepter is called for 401');
      }
      console.log('Status:', error.response.status);
      console.log('Data:', JSON.stringify(error.response.data));
      // console.log('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.log('Error Message:', error.message);
    }

    return Promise.reject(error);
  };
  return client(options).then(onSuccess).catch(onError);
};


export default request;
