import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import { setNetInfo } from './src/actions'

import Router from './src/router';
import NetInfo from '@react-native-community/netinfo'
import { setConnectionIfNotExists } from './src/utils';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
console.disableYellowBox = true

export default class App extends Component {


  componentDidMount() {
    NetInfo.addEventListener(state => {
      let currentSignalrConnection = store.getState().signalr_connection.signalrConnection

      if (store.getState().netInfo.netInfo !== state.isConnected) {
        store.dispatch(setNetInfo(state.isConnected))
      }




      debugger
      //bağlantı varsa ve 2 true bug'ı yoksa:
      if (state.isConnected) {
        //connection hiç oluşmamışsa veya conn var ve bağlantısı yoksa:

        if ((!currentSignalrConnection) || (currentSignalrConnection && currentSignalrConnection.state === 0)) {
          setConnectionIfNotExists(currentSignalrConnection)
          // currentSignalrConnection = store.getState().signalr_connection.signalrConnection
          // console.log('myconnAPP', currentSignalrConnection)
        }
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>

    );
  }
}

AppRegistry.registerComponent('App', () => App);

// function bindAction(dispatch) {
//   return {



//   };
// }

// export default connect(mapStateToProps, bindAction)(App);