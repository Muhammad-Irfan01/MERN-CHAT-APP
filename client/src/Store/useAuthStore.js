import {create} from 'zustand'
import { axiosInstance } from '../lib/Axios'
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,

    checkAuth : async() => {
        try {
            const res = await axiosInstance.get('/validate');
        set({authUser : res.data});
        } catch (error) {
            console.log('error in AuthUser : ' + error);
            set({authUser : null});
        } finally {
            set({isCheckingAuth : false})
        }
    },

    signup : async(formData) => {
        set({isSigningUp : true});
        try {
            const res = await axiosInstance.post('/signup', formData);
            set({authUser : res.data});
            toast.success('Account Created Successfully');
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp : false});
        }
    },

    login : async(formData) => {
        set({isLoggingIn : true});
        try {
            const res = await axiosInstance.post('/login', formData);
            set({authUser : res.data});
            toast.success('Log In Successful');
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isLoggingIn : false});
        }
    },

    logout : async() => {
        try {
             await axiosInstance.post('/logout');
            set({authUser : null});
            toast.success('Logout Successful');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile : async(Data) => {
        set({isUpdatingProfile : true});
        try {
            const res = await axiosInstance.put('/updateprofile', Data);
            set({authUser : res.data});
            toast.success('Profile Updated Successfully');
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUpdatingProfile : false})
        }
    }
}))
