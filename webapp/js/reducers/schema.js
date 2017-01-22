import { schema } from 'normalizr';

const key = new schema.Entity('keys');
export const namespace = new schema.Entity('namespaces', {
    keys: [key],
});
export const arrayOfNamespaces = new schema.Array(namespace);
