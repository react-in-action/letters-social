export const providers = ['Github', 'Facebook', 'Google', 'Twitter'];

export const app = {
    LOADING: 'letters-social/app/loading',
    LOADED: 'letters-social/app/loaded',
    ERROR: 'letters-social/app/error'
};

export const auth = {
    AUTH_LOGIN_REQUEST: 'letters-social/auth/login/request',
    AUTH_LOGIN_SUCCESS: 'letters-social/auth/login/success',
    AUTH_LOGIN_FAILURE: 'letters-social/auth/login/FAILURE',
    AUTH_LOGOUT_REQUEST: 'letters-social/auth/logout/request',
    AUTH_LOGOUT_SUCCESS: 'letters-social/auth/logout/success',
    AUTH_LOGOUT_FAILURE: 'letters-social/auth/logout/FAILURE'
};

export const posts = {
    CREATE: 'letters-social/post/create',
    DELETE: 'letters-social/post/delete',
    UPDATE: 'letters-social/post/update',
    GET: 'letters-social/post/get',
    LIKE: 'letters-social/post/update/like',
    NEXT: 'letters-social/post/paginate/next',
    PREV: 'letters-social/post/paginate/prev',
    FIRST: 'letters-social/post/paginate/first',
    LAST: 'letters-social/post/paginate/last',
    UPDATE_LINKS: 'letters-social/post/paginate/update',
    ERROR: 'letters-social/post/error'
};

export const comments = {
    CREATE: 'letters-social/comment/create',
    DELETE: 'letters-social/comment/delete',
    UPDATE: 'letters-social/comment/update',
    ERROR: 'letters-social/comment/error'
};
