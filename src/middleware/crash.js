import { createError } from '../actions/error';
export default store => next => action => {
    try {
        return next(action);
    } catch (err) {
        window.Rollbar.configure({ payload: store.getState() });
        window.Rollbar.error('An error occurred!', err);
        console.error(err);
        store.dispatch(createError(err));
    }
};
