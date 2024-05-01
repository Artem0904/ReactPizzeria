import api from "./api";

const route = "pizza/";

export function getPizzas() {
    return api.get(`${route}all`);
}

export function createPizza([pizza]) {
    return api.post(`${route}`, { pizza });
}