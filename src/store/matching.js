import  { writable, get } from 'svelte/store'

let map = new Map();


const progressingQueue = writable(map);
export const progressing = {
    subscribe : progressingQueue.subscribe,
    update: progressingQueue.update,
    set: progressingQueue.set,
    isempty: () => {
        return get(progressingQueue).size === 0;
    },
    enqueue: (matchingid, userid, num, name, time=null) => progressingQueue.update((Q) => {
        let info = new Map();
        console.log(time);
        if (time === null) {
            time = new Date();
            time.setMinutes(time.getMinutes() + 10);
        }
        console.log(time);
        info.set('matchingid', matchingid)
        info.set('userid', userid);
        info.set('number', num);
        info.set('time', time);
        info.set('name', name);
        info.set('status', "progress");
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