import { rootReducer } from './reducers';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import notificationMiddleware from '../middlewares/notificationMiddleware';
const environment = process?.env.NODE_ENV
const middleware = environment === 'development' ? applyMiddleware(promise, thunk, notificationMiddleware) : applyMiddleware(promise, thunk, notificationMiddleware)
function Store () {
        return createStore(rootReducer, middleware);
}
export default Store;

