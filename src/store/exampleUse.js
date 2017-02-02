import configureStore from './configureStore';
import { loading, loaded } from '../actions/loading';
const store = configureStore();

console.log('========== Example store ===========');
store.dispatch(loading());
store.dispatch(loaded());
store.dispatch(loading());
store.dispatch(loaded());
console.log('========== end example store ===========');
