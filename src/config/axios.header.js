import axios from "axios";
import {API} from "@/config/Endpoint";


axios.defaults.baseURL = API.BASE_URL;
//axios.defaults.withCredentials = true
let token = null;
const user = JSON.parse(localStorage.getItem('user'));
if(user !== null && user !== undefined) {
    token = user.accessToken;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
