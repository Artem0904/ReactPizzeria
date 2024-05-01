import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "pizza/"
});

// ----- create service object
export const pizzasService = {
    get: function () {
        return api.get('all');
    },
    getPizzaSizes: function () {
        return api.get('pizzaSizes');
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
    }
}

// or create separate functions
// export function getProducst() {
// }
// export function createProduct(product) { 
// }