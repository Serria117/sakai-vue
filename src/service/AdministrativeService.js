import axios from 'axios';
import {API} from '@/config/Endpoint';

export default class AdministrativeService {
    getAllProvinces() {
        return axios.get(API.LOCATION_API.GET_PROVINCE)
            .then(res => res.data);
    }

    getDistricts(pId) {
        return axios.get(API.LOCATION_API.GET_DISTRICT, {params: {pId: pId}})
            .then(res => res.data);
    }

    createProvince(province) {
        return axios.post(API.LOCATION_API.CREATE_PROVINCE, {province})
            .then(res => res.data);
    }

    createDistrict(district) {
        return axios.post(API.LOCATION_API.CREATE_DISTRICT, {district})
            .then(res => res.data);
    }

    createTaxAuth(taxAuth) {
        return axios.post(API.TAX_API.CREATE, {taxAuth})
            .then(res => res.data);
    }

    getTaxAuthByProvince(pId) {
        return axios.get(API.TAX_API.GET_BY_PROVINCE, {params: {pId: pId}})
            .then(res => res.data);
    }
    checkTaxCode(taxCode) {
        return axios.get(API.CUSTOMER_API.CHECK_TAX_CODE, {params: {taxCode: taxCode}})
          .then(res => res.data);
    }
}
