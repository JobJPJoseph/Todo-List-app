const Item = require('../lib/item');
const { Purge } = require('../lib/purges-linked-list');

class List {

    constructor(label) {
        this.label = label;
        this.items = new Array(10);
        this.length = 0;
        this.purges = new Purge;
    }

    addItem(title, deadline, description) {
        const item = new Item(title, deadline, description);
        item.index = this.length;
        this.items[this.length] = item;
        this.length++;
    }

    removeItem(index) {
        const item = this.items[index];

        // We need to do move everything to the left.
        for (let i = index; i < this.length; i++) {
            let next = this.items[i + 1];
            this.items[i] = next;
            if (typeof this.items[i] === 'object') this.items[i].index--;
        }

        this.length--;
        return item;
    }

    swap(reference, direction) {
        if (direction < -1 || direction > 1) return;

        if (direction > 0) {
            if ((reference - 1) < 0) return;

            this.items[reference].index--;
            this.items[reference - direction].index++;
            [this.items[reference], this.items[reference - direction]] = [this.items[reference - direction], this.items[reference]];
        } else {
            if ((reference + 1) >= this.length) return;

            this.items[reference].index++;
            this.items[reference + Math.abs(direction)].index--;
            [this.items[reference], this.items[reference + Math.abs(direction)]] = [this.items[reference + Math.abs(direction)], this.items[reference]];
        }

    }

    up(index, amount=1) {

        while(amount > 0) {
            this.swap(index, 1);
            index--;
            amount--;
        }

    }

    down(index, amount=1) {

        while(amount > 0) {
            this.swap(index, -1);
            index++;
            amount--;
        }

    }

    toggleItem(reference) {
        return this.items[reference].mark();
    }

    purgeItem(reference) {
        this.purges.enqueue(this.removeItem(reference));
    }

    removeNode() {
        return this.purges.dequeue().value;
    }

    undo() {
        let item = this.removeNode();

        // We need to do move everything to the right.
        for (let i = this.length; i > item.index; i--) {
            let next = this.items[i - 1];
            this.items[i] = next;
            if (typeof this.items[i] === 'object') this.items[i].index++;
        }

        this.items[item.index] = item;
    }

    // markedTasks() {
    //     let arr = [];
    //     let reference = 0;

    //     while(reference < this.length) {

    //         // Sp we don't pick up a an 'undefined' or 'null
    //         if (typeof this.items[reference] === 'object') {

    //             if (this.items[reference].done) {
    //                 arr.push(this.items[reference]);
    //                 // remove the item
    //                 // update indices
    //             }

    //         }

    //     }

    // }

    removeMarkTasks() {
        // We can iterate through this.items using a while loop
        // If the item's done property is true
            // We will call list.purgeItem(reference)
            // This will remove the item and update indices and update list.purges
            // Also if true, don't update reference
            // if false, update reference

        let reference = 0;

        while(reference < this.length) {

            if (typeof this.items[reference] !== 'object') break;

            if (this.items[reference].done) {
                this.purgeItem(reference);
            } else {
                reference++;
            }

        }

    }

    priority() {
        return this.items[0];
    }

    ascending() {

        for (let i = 0; i < this.length - 1; i++) {

            for (let j = 0; j < this.length - 1; j++) {
                this.items.sort((a, b) => {
                    if (a.year !== b.year) {
                        return a.year - b.year;
                    } else if (a.month !== b.month) {
                        return a.month - b.month;
                    } else {
                        return a.day - b.day;
                    }
                });
            }

        }

    }

    decsending() {

        for (let i = 0; i < this.length - 1; i++) {

            for (let j = 0; j < this.length - 1; j++) {
                this.items.sort((a, b) => {
                    if (b.year !== a.year) {
                        return (b.year - a.year);
                    } else if (b.month !== a.month) {
                        return (b.month - a.month);
                    } else {
                        return (b.day - a.day);
                    }
                });
            }

        }
    }

    sortByDeadline(input) {
        if (typeof input !== 'string') throw new Error('Input must be a string.');

        if (input === 'acsending') { // lowest date first
            this.ascending();
        }

        if (input === 'decsending') { // highest date first
            this.decsending();
        }

    }

}

module.exports = List;
