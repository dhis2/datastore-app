/**
 * Created by pjurasek on 17.10.16.
 */

var apiClass = undefined;

class Api
{

    constructor(url, auth) {
        this.url = url;
        this.auth = auth;
        this.ignoredStores = ['METADATASTORE', 'HISTORYSTORE'];
    }

    getNamespaces() {
        const ignoredStores = this.ignoredStores;

        return fetch(this.url+'/dataStore', this.getHeaders())
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .then(response => {
                return response.filter(function(value) {
                    return ignoredStores.indexOf(value) === -1;
                })
            });
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

    createValue(namespace, key, value, log = true) {
        return fetch(this.url+'/dataStore/'+namespace+'/'+key, Object.assign({}, {
            'method': 'POST',
            'body': JSON.stringify(value),
        }, this.getHeaders()))
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .then(response => {
                log && this.updateHistory(namespace, key, value);
                return response;
            });
    }

    updateValue(namespace, key, value, log = true) {
        return fetch(this.url+'/dataStore/'+namespace+'/'+key, Object.assign({}, {
            'method': 'PUT',
            'body': JSON.stringify(value),
        }, this.getHeaders()))
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .then(response => {
                log && this.updateHistory(namespace, key, value);
                return response;
            });
    }

    deleteValue(namespace, key) {
        return fetch(this.url+'/dataStore/'+namespace+'/'+key, Object.assign({}, {
            'method': 'DELETE',
        }, this.getHeaders()))
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .then(response => {
                this.updateHistory(namespace, key, 'DELETED');
                return response;
            });
    }


    getHistory(namespace, key) {

        return fetch(this.url+'/dataStore/HISTORYSTORE/'+id, this.getHeaders());
    }

    updateHistory(namespace, key, newValue) {
        const id = this.buildId(namespace, key);

        return this.getHistory(namespace, key)
            .then(response => {
                if (response.status === 404) {
                    this.createValue('HISTORYSTORE', id, [newValue], false);
                    return null;
                } else {
                    return response.json();
                }
            }).then(history => {
                if (history !== null) {
                    history.unshift(newValue);
                    this.updateValue('HISTORYSTORE', id, history, false);
                }
            });
    }


    successOnly(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    }

    buildId(namespace, key) {
        return encodeURIComponent(namespace+':'+key);
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
