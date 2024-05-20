import api from "./api";

const route = "beverage/";

export function getBeverages() {
    return api.get(`${route}all`);
}

export function createBeverage([beverage]) {
    return api.post(`${route}`, { beverage });
}