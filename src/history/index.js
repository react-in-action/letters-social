import { browserHistory } from 'react-router';
const history = typeof window !== 'undefined' ? browserHistory : { push: () => {} };
const navigate = to => history.push(to);
export { history, navigate };
