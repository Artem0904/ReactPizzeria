import axios from "axios";
import { tokensService } from "./tokens";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "pizza"
});

api.interceptors.request.use(
    (config) => {
        // Get token and add it to header "Authorization" from secure storgage
        const token = tokensService.getAccessToken();
        console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ----- create service object
export const pizzasService = {
    get: function () {
        return api.get('all');
    },
    getPizzaSizes: function () {
        return api.get('pizzaSizes');
    },
    getById: function (id) {
        return api.get(`${id}`);
    },
    create: function (model) {

        const formData = new FormData();

        for (const key in model) {
            formData.append(key, model[key]);
        }

        return api.post("", formData);
    },
    delete: function (id) {
        return api.delete(`${id}`);
    },
    edit: function (model) {
        return api.put("", model);
    }
}

// or create separate functions
// export function getProducst() {
// }
// export function createProduct(product) { 
// }