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
}

module.exports = List;
