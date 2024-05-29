const accessTokenKey = "accessKey";

export const tokensService = {
    save: function (model) {
        localStorage.setItem(accessTokenKey, model.accessToken);
    },
    clear: function () {
        localStorage.removeItem(accessTokenKey);
    },
    getAccessToken() {
        return localStorage.getItem(accessTokenKey);
    }
}