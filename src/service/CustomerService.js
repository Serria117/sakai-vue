import {API} from "@/config/Endpoint";
import axios from "axios";

const contextPath = import.meta.env.BASE_URL;

export default class CustomerService {

    createCustomer(newCustomer) {
        return axios.post(API.CUSTOMER_API.CREATE, newCustomer)
            .then(res => res.data);
    }

    getAllCustomer(page, size) {
        return axios.get(API.CUSTOMER_API.GET_ALL, {
            params: {page, size}
        }).then(res => res.data);
    }
    
    getCustomerInfo(taxCode){
        return axios.get(`https://api.vietqr.io/v2/business/${taxCode}`, {withCredentials: false})
            .then(res => res.data);
    }

    async getCustomersSmall() {
        const res = await fetch(contextPath + 'demo/data/customers-small.json');
        const d = await res.json();
        return d.data;
    }

    async getCustomersMedium() {
        const res = await fetch(contextPath + 'demo/data/customers-medium.json');
        const d = await res.json();
        return d.data;
    }

    async getCustomersLarge() {
        const res = await fetch(contextPath + 'demo/data/customers-large.json');
        const d = await res.json();
        return d.data;
    }

    async getCustomersXLarge() {
        const res = await fetch(contextPath + 'demo/data/customers-xlarge.json');
        const d = await res.json();
        return d.data;
    }

    async getCustomers(params) {
        const queryParams = Object.keys(params)
            .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
        const res = await fetch('https://www.primefaces.org//demo/data/customers?' + queryParams);
        return await res.json();
    }
}
