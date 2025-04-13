import { create } from "zustand"

export const useAuthstore = create((set) => ({
    authUser: null,
    isCheckingAuth:true,
}))