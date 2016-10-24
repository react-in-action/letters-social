import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const navigate = to => history.push(to);

export { history, navigate };
