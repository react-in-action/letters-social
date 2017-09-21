import { createError } from '../actions/error';

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
        window.Raven.setUserContext(user);
        window.Raven.captureException(err);
        return store.dispatch(createError(err));
    }
};
