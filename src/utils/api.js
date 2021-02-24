import { getInstance } from 'd2'
import { CREATED, DELETED } from '../constants/apiHistoryActions'
import { API_URL } from '../constants/apiUrls'

class Api {
    /**
     * @param url API endpoint url
     * @param auth Authentication HTTP header content
     */
    constructor() {
        this.cache = []
        this.ignoredStores = ['']
    }

    getNamespaces() {
        return getInstance().then(d2 =>
            d2.dataStore
                .getAll()
                .then(response =>
                    response.filter(
                        value => this.ignoredStores.indexOf(value) === -1
                    )
                )
        )
    }

    deleteNamespace(namespace) {
        return getInstance().then(d2 =>
            d2.dataStore.delete(namespace).then(response => {
                this.cache[namespace] = []
                return response
            })
        )
    }

    getKeys(namespace) {
        return getInstance()
            .then(d2 => d2.dataStore.get(namespace))
            .then(resName => resName.getKeys())
            .catch(error => Promise.reject(error))
    }

    /**
     * @param namespace
     * @param key
     */
    getValue(namespace, key) {
        const cache = this.cache

        // check for cache hit
        if (
            cache[namespace] === undefined ||
            cache[namespace][key] === undefined
        ) {
            return this.getMetaData(namespace, key).then(result => {
                const jsonLength = result.value.length
                const val = JSON.parse(result.value)

                // cache result
                if (cache[namespace] === undefined) {
                    cache[namespace] = []
                }
                const ret = {
                    length: jsonLength,
                    value: val,
                }
                cache[namespace][key] = ret

                return ret
            })
        }

        return new Promise(resolve => {
            resolve(cache[namespace][key])
        })
    }

    /**
     * @param namespace
     * @param key
     */
    getMetaData(namespace, key) {
        return getInstance()
            .then(d2 => d2.dataStore.get(namespace, false))
            .then(namespace => namespace.getMetaData(key))
    }

    /**
     * @param namespace
     * @param key
     * @param value
     */
    createValue(namespace, key, value) {
        return getInstance()
            .then(d2 => d2.dataStore.get(namespace))
            .then(resName => resName.set(key, value, true))
            .then(response => {
                // cache value
                if (this.cache[namespace] === undefined) {
                    this.cache[namespace] = []
                }
                const ret = {
                    length: 0,
                    value: value,
                }
                this.cache[namespace][key] = ret

                return response
            })
    }

    /**
     * @param namespace
     * @param key
     * @param value
     */
    updateValue(namespace, key, value) {
        return getInstance()
            .then(d2 => d2.dataStore.get(namespace))
            .then(resName => resName.update(key, value))
            .then(response => {
                // cache value
                if (this.cache[namespace] === undefined) {
                    this.cache[namespace] = []
                }
                this.cache[namespace][key] = { value }
                return response
            })
    }

    deleteValue(namespace, key) {
        return getInstance()
            .then(d2 => d2.dataStore.get(namespace))
            .then(resName => resName.delete(key))
            .then(response => {
                // delete cache value
                if (
                    this.cache[namespace] !== undefined &&
                    this.cache[namespace][key] !== undefined
                ) {
                    delete this.cache[namespace][key]
                }
                return response
            })
    }

    /**
     * Updates the history of the namespace
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
            value: `Key '${key}' was ${historyRecord.action.toLowerCase()}.`,
        }

        return this.getHistory(namespace)
            .then(history => {
                history.unshift(namespaceHistoryRecord)

                if (historyRecord.action === DELETED) {
                    // special check for delete action
                    this.getKeys(namespace)
                        .then(response => {
                            if (response.length < 1) {
                                // last key in namespace was deleted, namespace got deleted too
                                history.unshift({
                                    name: namespace,
                                    action: DELETED,
                                    date: new Date(),
                                    user: historyRecord.user,
                                    value: 'Namespace was deleted.',
                                })

                                delete this.cache[namespace]
                            }

                            this.updateValue('HISTORYSTORE', namespace, history)
                        })
                        .catch(e => {
                            console.error(e)
                        })
                } else {
                    // create or update action
                    this.updateValue('HISTORYSTORE', namespace, history)
                }
            })
            .catch(e => {
                if (e.httpStatusCode === 404) {
                    // this history record is first
                    const value = [
                        {
                            name: namespace,
                            action: CREATED,
                            date: namespaceHistoryRecord.date,
                            user: historyRecord.user,
                            value: 'Namespace was created.',
                        },
                    ]
                    return this.createValue(
                        'HISTORYSTORE',
                        namespace,
                        value,
                        false
                    ).then(() => {
                        value.unshift(namespaceHistoryRecord)
                        this.updateValue('HISTORYSTORE', namespace, value)
                    })
                }
            })
    }

    /**
     * Make sure the response status code is 2xx
     * @param response
     */
    successOnly(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        }
        return Promise.reject(response)
    }

    /**
     * @param namespace
     * @param key
     */
    buildId(namespace, key) {
        return encodeURIComponent(`${namespace}:${key}`)
    }
}

const apiInstance = new Api(API_URL)
export default apiInstance
