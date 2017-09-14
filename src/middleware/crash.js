import { createError } from '../actions/error';
import { isServer } from '../utils/environment';
export default store => next => action => {
    if (isServer()) {
        return next(action);
    }
    try {
        return next(action);
    } catch (err) {
        const { user } = store.getState();
        console.error(err);
        window.Raven.setUserContext(user);
        window.Raven.captureException(err);
        return store.dispatch(createError(err));
    }
};
