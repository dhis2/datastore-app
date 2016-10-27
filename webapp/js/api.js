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
            .then(response => this.successOnly(response))
            .then(response => response.json());
    }

    deleteNamespace(namespace) {
        return fetch(this.url+'/dataStore/'+namespace, Object.assign({}, {
            'method': 'DELETE',
        }, this.getHeaders()))
            .then(response => this.successOnly(response))
            .then(response => response.json());
    }

    getKeys(namespace) {
        return fetch(this.url+'/dataStore/'+namespace, this.getHeaders())
            .then(response => this.successOnly(response))
            .then(response => response.json());
    }

    getValue(namespace, key) {
        return fetch(this.url+'/dataStore/'+namespace+'/'+key, this.getHeaders())
            .then(response => this.successOnly(response))
            .then(response => response.json());
    }

    getMetaData(namespace, key) {
        return fetch(this.url+'/dataStore/'+namespace+'/'+key+'/metaData', this.getHeaders())
            .then(response => this.successOnly(response))
            .then(response => response.json());
    }

    createValue(namespace, key, value) {
        return fetch(this.url+'/dataStore/'+namespace+'/'+key, Object.assign({}, {
            'method': 'POST',
            'body': JSON.stringify(value),
        }, this.getHeaders()))
            .then(response => this.successOnly(response))
            .then(response => response.json());
    }

    updateValue(namespace, key, value) {
        return fetch(this.url+'/dataStore/'+namespace+'/'+key, Object.assign({}, {
            'method': 'PUT',
            'body': JSON.stringify(value),
        }, this.getHeaders()))
            .then(response => this.successOnly(response))
            .then(response => response.json());
    }

    deleteValue(namespace, key) {
        return fetch(this.url+'/dataStore/'+namespace+'/'+key, Object.assign({}, {
            'method': 'DELETE',
        }, this.getHeaders()))
            .then(response => this.successOnly(response))
            .then(response => response.json());
    }

    successOnly(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    }

    getHeaders() {
        return {
            'method': 'GET',
            'mode': 'cors',
            'headers': {
                'Content-Type': 'application/json',
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
