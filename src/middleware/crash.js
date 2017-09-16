import { createError } from '../actions/error';
import { isServer } from '../utils/environment';
export default store => next => action => {
    try {
        if (action.error) {
            console.error(action.error);
            console.error(action.info);
        }
        return next(action);
    } catch (err) {
        const { user } = store.getState();
        console.error(err);
        if (!isServer()) {
            window.Raven.setUserContext(user);
            window.Raven.captureException(err);
        }
        return store.dispatch(createError(err));
    }
};
