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
    }

    getHeaders() {
        return {
            'method': 'GET',
            'mode': 'cors',
            headers: {
                'Authorization': this.auth,
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
}

export default (function getApi() {
    if (typeof apiClass === 'undefined') {
        apiClass = new Api('https://play.dhis2.org/demo/api', `Basic ${btoa('admin:district')}`);
    }

    return apiClass;
})();
