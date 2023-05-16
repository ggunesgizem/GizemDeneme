import { combineReducers } from 'redux';
import json_code from './json_code';
import user_list from './userList'
import selected_index from './selected_index'
import token from './token'
import guest_info from './guest_info'
import user from './user'
import language from './language'
import exit_visitors from './exit_visitors'
import addupdate_guest from './addupdate_guest'
import createIpad from './createIpad'
import page from './page'
import netInfo from './net_info'
import signalr_connection from './signalr_connection'
import membership from './membership'

export default combineReducers({
   json_code,
   user_list,
   selected_index,
   token,
   guest_info,
   user,
   language,
   exit_visitors,
   addupdate_guest,
   createIpad,
   page,
   netInfo,
   signalr_connection,
   membership
});
