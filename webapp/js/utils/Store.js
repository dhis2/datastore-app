import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers/reducers';

const initialState = {

}

const store = createStore(reducers,
                          initialState,
                          applyMiddleware(thunk, logger));

export default store;



// if (__DEV__) {
//   createStore = compose(
//     require('redux-devtools').devTools(),
//     require('redux-devtools').persistState(
//       window.location.href.match(/[?&]debug_session=([^&]+)\b/)
//     ),
//     createStore
//   );
// }
//
// export function renderDevTools(store) {
//   if (__DEV__) {
//     let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');
//     return (
//       <DebugPanel top right bottom>
//         <DevTools store={store} monitor={LogMonitor} />
//       </DebugPanel>
//     );
//   }
//   return null;
// }
