import { createError } from '../actions/error';
export default store => next => action => {
    try {
        return next(action);
    } catch (err) {
        console.error(err);
        const { user } = store.getState();
        window.Raven.setUserContext(user);
        window.Raven.captureException(err);
        return store.dispatch(createError(err));
    }
};
