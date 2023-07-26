export const API = {
    BASE_URL: `https://localhost:8080`,
    
    AUTH_API: {
        SIGN_IN: '/auth/sign-in',
        SIGN_UP: '/auth/sign-up'
    },
    
    CUSTOMER_API: {
        GET_ALL: '/customers/get-all',
        CREATE: '/customers/create',
        EDIT: '/customers',
        DELETE: '/customers',
        CHECK_TAX_CODE: '/customers/check-tax-code'
    },
    LOCATION_API: {
        GET_PROVINCE: '/provinces/get-all',
        GET_DISTRICT: '/district/get-all',
        CREATE_PROVINCE: '/provinces/create',
        CREATE_DISTRICT: '/districts/create'
        
    },
    TAX_API: {
        GET_BY_PROVINCE: '/tax-authority/get-by-province',
        CREATE: '/tax-authority/create',
        
    }
}