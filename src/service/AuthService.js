import axios from "axios";
import {API} from '@/config/Endpoint';
export default class AuthService {
  login (username, password) {
    return axios.post(API.AUTH_API.SIGN_IN, 
      {username, password}, 
      {withCredentials: true})
      .then(res => res.data)
  }
}