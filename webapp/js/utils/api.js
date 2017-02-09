import { API_URL } from 'constants/apiUrls';
import { CREATED, UPDATED, DELETED } from 'constants/apiHistoryActions';
import { sprintf } from 'sprintf-js';
import { init, getInstance } from 'd2/lib/d2';

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
        this.userId = "";
        this.ignoredStores = ['METADATASTORE', 'HISTORYSTORE'];
        let headers = process.env.NODE_ENV === 'development' ? { Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=' } : null;
        this.d2 = init({baseUrl: 'https://play.dhis2.org/test/api', headers}).then(d2 => {
            this.userId = d2.currentUser.username;
        });
        this.historyStore = getInstance().then(d2 => d2.dataStore.get('HISTORYSTORE'));
    }

    getNamespaces() {
        return getInstance().then(d2 => d2.dataStore.getAll().
            then(response => response.filter((value) => this.ignoredStores.indexOf(value) === -1)));
    }

    deleteNamespace(namespace) {
        return getInstance().then(d2 => d2.dataStore.delete(namespace))
            .then(response => {
                this.cache[namespace] = [];
                this.updateNamespaceHistory(namespace, null, {
                    action: DELETED,
                    user: d2.currentUser.username,
                });
                return response;
            });
    }

    getKeys(namespace) {
        return getInstance().then(d2 => d2.dataStore.get(namespace)).then(resName => resName.getKeys())
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
        return getInstance().then(d2 => d2.dataStore.get(namespace, false)).then(namespace => namespace.getMetaData(key));
    }

    /**
     * @param namespace
     * @param key
     * @param value
     * @param log Should action be logged?
     */
    createValue(namespace, key, value, log = true) {
        return getInstance().then(d2 => d2.dataStore.get(namespace)).then(resName => resName.set(key, value))
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
        return getInstance().then(d2 => d2.dataStore.get(namespace)).then(resName => resName.update(key, value))
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
        return getInstance().then(d2 => d2.dataStore.get(namespace)).then(resName => resName.delete(key))
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
        return this.historyStore.then(hsStore => hsStore.get(id));
    }

    /**
     * Explicitly access key history with response status check
     * @param namespace
     * @param key
     */
    getHistoryOfKey(namespace, key) {
        const id = this.buildId(namespace, key);
        return this.historyStore.then(hsStore => {
            return hsStore.get(id)
        });
    }

    /**
     * Explicitly access namespace history with response status check
     * @param namespace
     */
    getHistoryOfNamespace(namespace) {
        return this.historyStore.then(hsStore => hsStore.get(namespace));
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
            .then(history => {
                if (history !== null) { // update history
                    history.unshift(historyRecord);
                    this.updateValue('HISTORYSTORE', id, history, false);
                }
            })
            .catch(e => {
                console.log(e)
                if (e.httpStatusCode === 404) { // this history record is first
                    console.log("createvalue")
                    this.createValue('HISTORYSTORE', id, [historyRecord], false);
                    return null;
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
        console.log("update namespace history ")
        return this.getHistory(namespace)
            .then(history => {
                history.unshift(namespaceHistoryRecord);

                if (historyRecord.action === DELETED) { // special check for delete action
                    this.getKeys(namespace)
                        .then(response => {
                            if (response.length < 1) { // last key in namespace was deleted, namespace got deleted too
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
                        }).catch(e => {
                        console.log(e)
                    });
                } else { // create or update action
                    this.updateValue('HISTORYSTORE', namespace, history, false);
                }
            }).catch(e => {
                if (e.httpStatusCode === 404) { // this history record is first
                    const value = [{
                        name: namespace,
                        action: CREATED,
                        date: namespaceHistoryRecord.date,
                        user: historyRecord.user,
                        value: 'Namespace was created.',
                    }];
                    return this.createValue('HISTORYSTORE', namespace, value, false)
                        .then(response => new Promise((resolve, reject) => resolve(value)))
                        .then(history => {
                            history.unshift(namespaceHistoryRecord);
                            this.updateValue('HISTORYSTORE', namespace, history, false);
                        })
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

export default (() =>
    new Api(API_URL))();
