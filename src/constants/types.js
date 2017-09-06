export const providers = ['Github', 'Facebook', 'Google', 'Twitter'];

export const app = {
    ERROR: 'letters-social/app/error',
    LOADED: 'letters-social/app/loaded',
    LOADING: 'letters-social/app/loading'
};

export const auth = {
    AUTH_LOGIN_FAILURE: 'letters-social/auth/login/FAILURE',
    AUTH_LOGIN_REQUEST: 'letters-social/auth/login/request',
    AUTH_LOGIN_SUCCESS: 'letters-social/auth/login/success',
    AUTH_LOGOUT_FAILURE: 'letters-social/auth/logout/FAILURE',
    AUTH_LOGOUT_REQUEST: 'letters-social/auth/logout/request',
    AUTH_LOGOUT_SUCCESS: 'letters-social/auth/logout/success'
};

export const posts = {
    CREATE: 'letters-social/post/create',
    ERROR: 'letters-social/post/error',
    GET: 'letters-social/post/get',
    LIKE: 'letters-social/post/update/like',
    NEXT: 'letters-social/post/paginate/next',
    UPDATE_LINKS: 'letters-social/post/paginate/update'
};

export const comments = {
    CREATE: 'letters-social/comments/create',
    ERROR: 'letters-social/comments/error',
    SHOW: 'letters-social/comments/show',
    TOGGLE: 'letters-social/comments/toggle',
    GET: 'letters-social/comments/get'
};
