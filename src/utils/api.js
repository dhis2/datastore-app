import { getInstance } from 'd2'
import { API_URL } from '../constants/apiUrls'

export class Cache {
    constructor() {
        this.cache = new Map()
    }

    clearNamespace(namespace) {
        if (this.cache.has(namespace)) {
            this.cache.get(namespace).clear()
        }
    }

    contains(namespace, key) {
        return this.cache.has(namespace) && this.cache.get(namespace).has(key)
    }

    get(namespace, key) {
        if (this.contains(namespace, key)) {
            return this.cache.get(namespace).get(key)
        }
    }

    set(namespace, key, value) {
        if (!this.cache.has(namespace)) {
            this.cache.set(namespace, new Map())
        }
        this.cache.get(namespace).set(key, value)
    }

    delete(namespace, key) {
        if (this.contains(namespace, key)) {
            this.cache.get(namespace).delete(key)
        }
    }
}

class Api {
    constructor() {
        this.cache = new Cache()
    }

    getNamespaces = async () => {
        const d2 = await getInstance()
        return d2.dataStore.getAll()
    }

    deleteNamespace = async namespace => {
        const d2 = await getInstance()
        const response = await d2.dataStore.delete(namespace)
        this.cache.clearNamespace(namespace)
        return response
    }

    getKeys = async namespace => {
        const d2 = await getInstance()
        const resName = await d2.dataStore.get(namespace)
        return resName.getKeys()
    }

    getValue = async (namespace, key) => {
        if (this.cache.contains(namespace, key)) {
            return this.cache.get(namespace, key)
        }

        const result = await this.getMetaData(namespace, key)
        const jsonLength = result.value.length
        const value = {
            length: jsonLength,
            value: JSON.parse(result.value),
        }
        this.cache.set(namespace, key, value)
        return value
    }

    getMetaData = async (namespace, key) => {
        const d2 = await getInstance()
        const response = await d2.dataStore.get(namespace, false)
        return response.getMetaData(key)
    }

    createValue = async (namespace, key, value) => {
        const d2 = await getInstance()
        const resName = await d2.dataStore.get(namespace, false)
        const response = await resName.set(key, value, true)
        this.cache.set(namespace, key, {
            length: 0,
            value,
        })
        return response
    }

    updateValue = async (namespace, key, value) => {
        const d2 = await getInstance()
        const resName = await d2.dataStore.get(namespace)
        const response = await resName.update(key, value)
        this.cache.set(namespace, key, { value })
        return response
    }

    deleteValue = async (namespace, key) => {
        const d2 = await getInstance()
        const resName = await d2.dataStore.get(namespace)
        const response = await resName.delete(key)
        this.cache.delete(namespace, key)
        return response
    }
}

const apiInstance = new Api(API_URL)
export default apiInstance
