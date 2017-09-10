if (process.env.NODE_ENV === 'production') {
    window.Raven.config('https://23f0e00b78a24ac88450c8261b59ed7c@sentry.io/212515').install();
}
