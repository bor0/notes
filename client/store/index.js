import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

const configureStore = ( initialState ) => {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(
			thunkMiddleware // allows us to do async dispatch
		)
	);

	return store;
};

export default configureStore;
