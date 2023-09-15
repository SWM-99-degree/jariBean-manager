import  { writable, get } from 'svelte/store'


const requestQueue = writable([]);
export const matching = writable();
export const Queue = {
        subscribe: requestQueue.subscribe,
        update: requestQueue.update,
        set: requestQueue.set,
        isempty: () => {
            console.log(get(requestQueue).length)
            if (get(requestQueue).length == 0) {
                return true;
            } else {
                return false;
            }
        },
        enqueue: (id, num, name) => requestQueue.update((Q) => {
            Q.push({ userid : id, number : num, name: name })
            return Q;
        }),
        dequeue: () => requestQueue.update((Q) => {
            if (Queue.isempty()) {
                return Q;
            } else {
                console.log("is not empty")
                let newMatching = Q.shift();
                matching.set(newMatching);
                return Q;
            }
        })
    }
