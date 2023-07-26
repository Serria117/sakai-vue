export default class API  {
    BASE_URL: `http://localhost:8080/api`;
    AUTH_API: {
        SIGN_IN: '/auth/sign-in',
        SIGN_UP: '/auth/sign-up'
    };
    CUSTOMER_API: {
        GET_ALL: '/customer/get-all',
        CREATE: '/customer/create',
        EDIT: '/customer',
        DELETE: '/customer'
    }
}