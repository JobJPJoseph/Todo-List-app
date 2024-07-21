class Purge {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    enqueue(item) {

        // We missed something important and that is we need to call the PurgeNode class

        let node = new PurgeNode(item);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }

        this.length++;
    }

    dequeue() {

        if (!this.head) return null;
        let temp;

        if (this.head === this.tail) {
            temp = this.head;
            this.head = null;
            this.tail = null;
        } else {
            temp = this.tail;
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        }

        this.length--;
        return temp;

    }
}

class PurgeNode {
    constructor(item) {
        this.value = item;
        this.next = null;
        this.prev = null;
    }
}

module.exports = {
    Purge,
    PurgeNode
};
