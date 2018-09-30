import { DB } from 'idb';
import { LocalDB } from './LocalDB';

export interface Post {
    id: number;
    title: string;
    body: string;
}

export class PostService {

    public static getPosts() {
        return LocalDB.get()
            .then((db) => {
                return this.getAll(db);
            });
    }
    public static savePost(post: Post) {

        return LocalDB.get()
            .then((db) => {
                return this.insert(post, db);
            });
    }
    private static getAll(db: DB) {

        var tx = db.transaction('posts', 'readonly');
        var store = tx.objectStore('posts');

        return store.getAll().then(values => {

            var retVal: Post[] = [];

            values.forEach(value => {
                retVal.push({
                    id: value.id,
                    title: value.title,
                    body: value.body,
                });
            });

            return Promise.resolve<Post[]>(retVal);
        });
    }   
    private static insert(post: Post, db: DB) {

        var tx = db.transaction('posts', 'readwrite');
        var store = tx.objectStore('posts');

        let value = {
            title: post.title,
            body: post.body,
        };

        return store.add(value).then(key => {
            return store.get(key).then(value => {

                var retVal: Post;

                retVal = {
                    id: value.id,
                    title: value.title,
                    body: value.body,
                };

                return Promise.resolve<Post>(retVal);
            });
        });
    }
}