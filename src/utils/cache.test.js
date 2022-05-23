import { Cache } from './api.js'

describe('Cache', () => {
    it('should be possible to set and get namespace/key combinations', () => {
        const cache = new Cache()
        const namespace = 'test namespace'
        const key = 'test key'
        const value = 'test value'

        expect(cache.contains(namespace, key)).toBe(false)

        cache.set(namespace, key, value)
        expect(cache.contains(namespace, key)).toBe(true)
        expect(cache.get(namespace, key)).toBe(value)
    })

    it('should be possible to delete namespace/key combinations', () => {
        const cache = new Cache()
        const namespace = 'test namespace'
        const key = 'test key'
        const value = 'test value'

        cache.set(namespace, key, value)
        expect(cache.contains(namespace, key)).toBe(true)

        cache.delete(namespace, key)
        expect(cache.contains(namespace, key)).toBe(false)
        expect(cache.get(namespace, key)).toBe(undefined)
    })

    it('should be possible to clear a namespace', () => {
        const cache = new Cache()
        const namespace = 'test namespace'
        const key = 'test key'
        const value = 'test value'

        cache.set(namespace, key, value)
        expect(cache.contains(namespace, key)).toBe(true)

        cache.clearNamespace(namespace)
        expect(cache.contains(namespace, key)).toBe(false)
        expect(cache.get(namespace, key)).toBe(undefined)
    })
})
