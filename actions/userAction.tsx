import axios from "../utils/axios";

export const getUsers = async () => {
    let response = await axios.get('/');
    try {
        // if (order) {
        //     response = await axios.get('/users?order=' + order + '&page=' + page + '&take=' + take + '&search=' + search + '&type_user=' + type_user);
        // } else if (take <= 50) {
        //     response = await axios.get('/users?page=' + page + '&take=' + take + '&search=' + search + '&type_user=' + type_user);
        // } else {
        //     response = await axios.get('/users?page=' + page + '&search=' + search + '&type_user=' + type_user);
        // }

        // if (response.status) {
        //     return response.data;
        // } else {
        //     return arr;
        // }
        return response.data;
    } catch (error) {
        return error;
    }
};