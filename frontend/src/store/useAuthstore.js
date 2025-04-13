import { create } from "zustand"
import { axiosinstance } from "../lib/axios.js";

export const useAuthstore = create((set) => ({
    authUser: null,
    issigningup: false,
    islogining: false,
    isCheckingAuth: true,
    isupdating: false,
    checkAuth: async () => {
        try {
            const res = await axiosinstance.get("auth/check")
            
            set({authUser:res.data})
        } catch (error) {
            set({authUser:null})
            console.log("error in CheckAuth", error);
        } finally {
            set({isCheckingAuth:false})
        }
    },

    signup: async (data) => {
        try {
          set({ issigningup: true });
          const res = await axiosinstance.post("auth/signup", data);
          set({ authUser: res.data });
        } catch (error) {
          console.log("Error in signup:", error);
        } finally {
          set({ issigningup: false });
        }
    }
}))