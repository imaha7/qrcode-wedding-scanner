import axios from "../utils/axios";

export const showUser = async ({ id }: any) => {
    let response = await axios.get('/posts/' + id);
    try {
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateUser = async ({ id, status }: any) => {
    let response = await axios.patch('/posts/' + id, { status: status });
    try {
        return response.data;
    } catch (error) {
        return error;
    }
};