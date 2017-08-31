_f36‍.d(store => next => action => {
    try {
        return next(action);
    } catch (err) {
        window.Rollbar.configure({ payload: store.getState() });
        window.Rollbar.error('An error occurred!', err);
        throw err;
    }
});
