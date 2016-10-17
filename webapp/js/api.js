/**
 * Created by pjurasek on 17.10.16.
 */

var apiClass = undefined;

class Api
{

    constructor(url, auth) {
        this.url = url;
        this.auth = auth;
    }

    getNamespaces() {
        return fetch(this.url+'/dataStore', this.getHeaders())
            .then(response => response.json());
    }

    getHeaders() {
        return {
            'headers': {
                'Authorization': this.auth
            }
        };
    }
}

export default (function getApi() {
    if (typeof apiClass === 'undefined') {
        apiClass = new Api('https://play.dhis2.org/demo/api', `Basic ${btoa('admin:district')}`);
    }

    return apiClass;
})();
