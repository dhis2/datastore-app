import * as actions from '../constants/actionTypes';
import api from '../utils/api';


export function requestHistory() {
  return {
    type: actions.SET_EDIT_WINDOW,
    payload: { }
  }
}


export function toggleNamespace(items) {
    return {
        type: actions.SET_BROWSER_WINDOW,
        payload: {

        }
    }
}
