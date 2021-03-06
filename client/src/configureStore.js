import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';

import normalizrMiddleware from './middleware/normalizr';
import headersMiddleware from './middleware/headers';
import RootReducer from './reducers';


const configureStore = () => {
	const loggerMiddleware = createLogger();

	const middlewares = [
		headersMiddleware,
		apiMiddleware,
		normalizrMiddleware,
		// loggerMiddleware,
	];

	return createStore(
		RootReducer,
		applyMiddleware(...middlewares)
	);
};

export default configureStore;