import instance from './AxiosConfig';

const api = {
    getItems() {
        return instance.get(`/calculator`);
    },
};

export default api;
