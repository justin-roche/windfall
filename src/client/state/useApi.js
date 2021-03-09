import { useReducer, useCallback, useContext } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { AppContext } from './store';
import { success, error } from './actions';

export const request = (endpoint, verb = 'get', params) => {
  try {
    return axios[verb]('/api/' + endpoint, params).then((r) => {
      console.log('api response', r);
      return r.data.data;
    });
  } catch (e) {}
};

export const getCommands = () => {
  return request('definitions');
};

export const executeScrapeAction = (data) => {
  console.log('data', data);
  return request('/execute', 'post', { data });
};

export const onSocketProgress = (progressHandler) => {
  socket.on('progress', progressHandler);
};

export const onSocketResults = (resultsHandler) => {
  socket.on('results', resultsHandler);
};

export const getResultsAction = (data) => {
  return request('/scrape/results');
};

export const deleteResultsAction = (data) => {
  return request('/scrape/results', 'delete');
};

export const getDatabaseAction = (data) => {
  return request('/database/all');
};
