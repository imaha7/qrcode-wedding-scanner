import axios from "../utils/axios";

export const showUser = async ({ id }: any) => {
    let response = await axios.get('/posts/' + id);
    try {
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateUser = async ({ id, username, name, invited_guests_count, status }: any) => {
    let response = await axios.patch('/posts/' + id, { username: username, name: name, invited_guests_count: invited_guests_count, status: status });
    try {
        return response.data;
    } catch (error) {
        return error;
    }
};