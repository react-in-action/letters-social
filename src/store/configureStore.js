import { __PRODUCTION__ } from 'environs';
import prodStore from './configureStore.prod';
import devStore from './configureStore.dev';
export default (__PRODUCTION__ ? prodStore : devStore);
