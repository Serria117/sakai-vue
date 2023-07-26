import axios from "axios";
import { defineStore } from "pinia";
import AuthService from "@/service/AuthService";
import router from "@/router";

export const userStore = defineStore(
  {
    id: "user",
    state: () => (
      {
        user: JSON.parse(localStorage.getItem("user")),
        isAuthenticate: false
      }),
    actions: {
      async login(username, password) {
        const authService = new AuthService();
        authService.login(username, password).then(data => {
          if(data != null && data.code === 200){
            this.user = data;
            this.isAuthenticate = true;
            //console.log(this.user);
            localStorage.setItem("user", JSON.stringify(this.user));
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            router.push("/");
          }
        });
      },
      
      async logout(){
        this.user = null;
        this.isAuthenticate = false;
        await router.push("/auth/sign-in");
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    },
    getters: {
      isAuthenticated() {
        return (this.user !== null && (Date.parse(this.user['tokenExpirationTime']) - new Date() > 0));
      }
    }
  });