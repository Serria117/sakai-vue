import axios from "axios";
import {API} from "@/config/Endpoint";

export default class LocationService {
    getAllProvince(){
        return axios.post(API)
    }
}