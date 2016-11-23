class Theme
{

    constructor(theme) {
        this.url = url;
    }
}

export default (function getApi() {
    if (typeof apiClass === 'undefined') {
        apiClass = new Api(API_URL, `Basic ${btoa('admin:district')}`);
    }

    return apiClass;
})();
