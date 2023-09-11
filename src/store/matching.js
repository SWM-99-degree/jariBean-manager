import  { writable, get } from 'svelte/store'

let map = new Map();
let info = new Map();
info.set('userid', "123");
info.set('number', "123");
info.set('matchingid', "123")
let time = new Date();
time.setMinutes(time.getMinutes()+1);
info.set('status', "complete");
info.set('time', time);
map.set("123", info);

const progressingQueue = writable(map);
export const progressing = {
    subscribe : progressingQueue.subscribe,
    update: progressingQueue.update,
    set: progressingQueue.set,
    isempty: () => {
        return get(progressingQueue).size === 0;
    },
    enqueue: (matchingid, userid, num) => progressingQueue.update((Q) => {
        let info = new Map();
        let time = new Date();
        time.setMinutes(time.getMinutes() + 10);
        info.set('matchingid', matchingid)
        info.set('userid', userid);
        info.set('number', num);
        info.set('time', time);
        info.set('status', "progress")
        Q.set(matchingid, info);
        console.log(Q);
        return Q;
    }),
    dequeue: (id) => progressingQueue.update((Q) => {
        Q.delete(id);
        console.log(id);
        return Q;
    }),
    cancel : (id) => progressingQueue.update((Q) => {
        let map = Q.get(id);
        map.set("status", "cancel")
        Q.set(id, map);

        setTimeout(() => {
            progressing.dequeue(id);
        }, 20000);
        return Q;
    }),
    complete : (id) => progressingQueue.update((Q) => {
        let map = Q.get(id);
        map.set("status", "complete")
        Q.set(id, map);

        setTimeout(() => {
            progressing.dequeue(id);
        }, 20000);
        return Q;
    })
}