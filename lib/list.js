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

}

module.exports = List;
