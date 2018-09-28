import idb from 'idb';

export class LocalDB {
    public static get() {
        return idb.open('blog-db', 1, (db) => {
            if (!db.objectStoreNames.contains('posts')) {
                db.createObjectStore('posts', { keyPath: 'id', autoIncrement: true });
            }
        });
    }
}