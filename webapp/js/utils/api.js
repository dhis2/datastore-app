import { API_URL } from 'constants/apiUrls';
import { CREATED, UPDATED, DELETED } from 'constants/apiHistoryActions';
import { sprintf } from 'sprintf-js';
import btoa from 'btoa';

let apiClass = undefined;

class Api
{

    /**
     * @param url API endpoint url
     * @param auth Authentication HTTP header content
     */
    constructor(url, auth) {
        this.url = url;
        this.auth = auth;
        this.cache = [];
        this.ignoredStores = ['METADATASTORE', 'HISTORYSTORE'];
    }

    init() {
        return this.checkSession().then(() => this);
    }

    checkSession(retry) {
        return fetch(`${this.url}/me`, this.getHeaders())
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .then(user => this.userId = user.userCredentials.username) // fetch userId that is used for history logging
            .catch(err => {
                // use auth in development, as no session exists
                if (process.env.NODE_ENV === 'development' && !retry) {
                    this.auth = `Basic ${btoa('admin:district')}`;
                    return this.checkSession(true);
                } else {
                    throw err;
                }
            });
    }

    getNamespaces() {
        return fetch(`${this.url}/dataStore`, this.getHeaders())
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .then(response => response.filter((value) => this.ignoredStores.indexOf(value) === -1));
    }

    deleteNamespace(namespace) {
        return fetch(`${this.url}/dataStore/${namespace}`, {
            ...this.getHeaders(),
            method: 'DELETE',
        })
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .then(response => {
                this.cache[namespace] = [];
                this.updateNamespaceHistory(namespace, null, {
                    action: DELETED,
                    user: this.userId,
                });
                return response;
            });
    }

    getKeys(namespace) {
        return fetch(`${this.url}/dataStore/${namespace}`, this.getHeaders())
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .catch(error => Promise.reject(error));
    }

    /**
     * @param namespace
     * @param key
     */
    getValue(namespace, key) {
        const cache = this.cache;

        // check for cache hit
        if (cache[namespace] === undefined || cache[namespace][key] === undefined) {
            return this.getMetaData(namespace, key)
                .then(result => {
                    const val = JSON.parse(result.value);

                    // cache result
                    if (cache[namespace] === undefined) {
                        cache[namespace] = [];
                    }
                    cache[namespace][key] = val;

                    return val;
                });
        }

        return new Promise((resolve) => {
            console.log('cache resolve');
            resolve(cache[namespace][key]);
        });
    }

    /**
     * @param namespace
     * @param key
     */
    getMetaData(namespace, key) {
        return fetch(`${this.url}/dataStore/${namespace}/${key}/metaData`, this.getHeaders())
            .then(response => this.successOnly(response))
            .then(response => response.json());
    }

    /**
     * @param namespace
     * @param key
     * @param value
     * @param log Should action be logged?
     */
    createValue(namespace, key, value, log = true) {
        return fetch(`${this.url}/dataStore/${namespace}/${key}`, {
            ...this.getHeaders(),
            method: 'POST',
            body: JSON.stringify(value),
        })
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .then(response => {
                // cache value
                if (this.cache[namespace] === undefined) {
                    this.cache[namespace] = [];
                }

                this.cache[namespace][key] = value;

                log && this.updateHistory(namespace, key, value, CREATED);

                return response;
            });
    }

    /**
     * @param namespace
     * @param key
     * @param value
     * @param log Should action be logged?
     */
    updateValue(namespace, key, value, log = true) {
        return fetch(`${this.url}/dataStore/${namespace}/${key}`, {
            ...this.getHeaders(),
            method: 'PUT',
            body: JSON.stringify(value),
        })
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .then(response => {
                // cache value
                if (this.cache[namespace] === undefined) {
                    this.cache[namespace] = [];
                }

                this.cache[namespace][key] = value;
                log && this.updateHistory(namespace, key, value, UPDATED);
                return response;
            });
    }

    deleteValue(namespace, key) {
        return fetch(`${this.url}/dataStore/${namespace}/${key}`, {
            ...this.getHeaders(),
            method: 'DELETE',
        })
            .then(response => this.successOnly(response))
            .then(response => response.json())
            .then(response => {
                // delete cache value
                if (this.cache[namespace] !== undefined && this.cache[namespace][key] !== undefined) {
                    delete this.cache[namespace][key];
                }

                this.updateHistory(namespace, key, {}, DELETED);

                return response;
            });
    }

    /**
     * @private
     * @param namespace
     * @param key Return history of a key if presenter, history of namespace otherwise
     */
    getHistory(namespace, key = null) {
        const id = key === null ? namespace : this.buildId(namespace, key);
        return fetch(`${this.url}/dataStore/HISTORYSTORE/${id}`, this.getHeaders());
    }

    /**
     * Explicitly access key history with response status check
     * @param namespace
     * @param key
     */
    getHistoryOfKey(namespace, key) {
        const id = this.buildId(namespace, key);
        return fetch(`${this.url}/dataStore/HISTORYSTORE/${id}`, this.getHeaders())
          .then(response => this.successOnly(response))
          .then(response => response.json());
    }

    /**
     * Explicitly access namespace history with response status check
     * @param namespace
     */
    getHistoryOfNamespace(namespace) {
        return fetch(`${this.url}/dataStore/HISTORYSTORE/${namespace}`, this.getHeaders())
          .then(response => this.successOnly(response))
          .then(response => response.json());
    }

    /**
     * @param namespace
     * @param key
     * @param newValue
     * @param action
     */
    updateHistory(namespace, key, newValue, action) {
        const id = this.buildId(namespace, key);
        const historyRecord = {
            name: key,
            action,
            date: new Date(),
            user: this.userId,
            value: newValue,
        };

        return this.getHistory(namespace, key)
            .then(response => {
                if (response.status === 404) { // this history record is first
                    this.createValue('HISTORYSTORE', id, [historyRecord], false);
                    return null;
                }
                return response.json();
            }).then(history => {
                if (history !== null) { // update history
                    history.unshift(historyRecord);
                    this.updateValue('HISTORYSTORE', id, history, false);
                }
            }).then(() => this.updateNamespaceHistory(namespace, key, historyRecord));
    }

    /**
     * @param namespace
     * @param key
     * @param historyRecord
     */
    updateNamespaceHistory(namespace, key, historyRecord) {
        const namespaceHistoryRecord = {
            name: namespace,
            action: historyRecord.action,
            date: new Date(),
            user: historyRecord.user,
            value: sprintf('Key \'%s\' was %s.', key, historyRecord.action.toLowerCase()),
        };

        return this.getHistory(namespace)
            .then(response => {
                if (response.status === 404) { // this history record is first
                    const value = [{
                        name: namespace,
                        action: CREATED,
                        date: namespaceHistoryRecord.date,
                        user: historyRecord.user,
                        value: 'Namespace was created.',
                    }];

                    return this.createValue('HISTORYSTORE', namespace, value, false)
                        .then(response => new Promise((resolve, reject) => resolve(value)));
                }
                return response.json();
            }).then(history => {
                history.unshift(namespaceHistoryRecord);

                if (historyRecord.action === DELETED) { // special check for delete action
                    this.getKeys(namespace)
                        .then(response => {
                            if (response.status === 404) { // last key in namespace was deleted, namespace got deleted too
                                history.unshift({
                                    name: namespace,
                                    action: DELETED,
                                    date: new Date(),
                                    user: historyRecord.user,
                                    value: 'Namespace was deleted.',
                                });

                                delete this.cache[namespace];
                            }

                            this.updateValue('HISTORYSTORE', namespace, history, false);
                        });
                } else { // create or update action
                    this.updateValue('HISTORYSTORE', namespace, history, false);
                }
            });
    }

    /**
     * Make sure the response status code is 2xx
     * @param response
     */
    successOnly(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    }

    /**
     * @param namespace
     * @param key
     */
    buildId(namespace, key) {
        return encodeURIComponent(`${namespace}:${key}`);
    }

    getHeaders() {
        let auth = null;
        if (this.auth) {
            auth = {
                Authorization: this.auth,
            };
        }
        return {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...auth,
            },
        };
    }
}

export default (function getApi() {
    if (typeof apiClass === 'undefined') {
        apiClass = new Api(API_URL);
    }
    return apiClass;
}());
