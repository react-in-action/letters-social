import createHistory from 'history/createBrowserHistory';

const history = typeof window !== 'undefined'
    ? createHistory()
    : { push: () => {} };
const navigate = to => history.push(to);

export { history, navigate };
