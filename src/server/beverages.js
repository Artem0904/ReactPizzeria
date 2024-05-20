import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "beverage/"
});

// ----- create service object
export const beveragesService = {
    get: function () {
        return api.get('all');
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