import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UserLoginForm } from "@/types/index";

export async function authenticateUser(formData: UserLoginForm) {
     try {
        const url = '/Auth/Login';
        const { data } = await api.post(url, formData);
        localStorage.setItem('AUTH_TOKEN', data.token);
        return data;
     } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
     }
}

export async function getUser() {
   try {
      const url = '/Auth/User';
      const { data } = await api.get(url);
      return data;
   } catch (error) {
      if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
      }
   }
}