import {createStore, applyMiddleware} from 'redux'
// lets us analyze redux state
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initState = {}

const middleware = [thunk]

const store = createStore( 
    rootReducer,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store