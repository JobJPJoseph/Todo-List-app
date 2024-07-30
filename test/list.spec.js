const List = require("../lib/list");
const Item = require("../lib/item");
const { Purge } = require('../lib/purges-linked-list');

const chai = require("chai");

const expect = chai.expect;

const spies = require("chai-spies");

chai.use(spies);

describe("List class", function () {

    it('should initalize the List class', function () {
        expect(List).to.exist;
    });

    it('should initalize the Linked List class', function () {
        expect(Purge).to.exist;
    });

    // list class
    let list;

    beforeEach(function () {
        list = new List('Gaming console');
        // list.purges = new Purge();
    });

    describe('Constructor', function () {

        it('should initialize a property called label', function () {
            expect(list.label).to.equal('Gaming console');
        });

        it('should initialize a property that is an array type called items', function () {
            expect(list.items).to.be.an('array');
        });

        it('should preallocate 10 indices for the items property', function () {
            expect(list.items.length).to.equal(10);
        });

        it('should initialize a property called length that represents the number of instances in items', function () {
            expect(list.length).to.equal(0);
        });

        it('should initialize a property called purges that should represent a linked list', function () {
            expect(list.purges).to.be.an('object');
        });

    });

    describe('addItem', function () {

        context('When the item is valid', function () {

            it('should create an instance of Item and push it into the items property', function () {
                list.addItem('Controller', '10-25-2025', 'For the PS5');
                expect(list.length).to.equal(1);
            });

            it('should set the item index', function () {
                list.addItem('Controller', '10-25-2025', 'For the PS5');
                list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');

                expect(list.items[0].index).to.equal(0);
                expect(list.items[1].index).to.equal(1);
            });

        });

        context('When the item is not valid', function () {

            it('should throw an Error when the deadline is not valid', function () {
                expect(() => list.addItem('Controller', '10252025', 'For the PS5')).to.throw(Error).with.property('message').that.includes('deadline was in an invalid format');
            });

        });

    });

    // We need a method that removes an item from items
    // We need to also make sure in solving the the problem that
    // We move everything after forward.
    // We need to return the item that was removed

    describe('removeItem', function () {

        beforeEach(function () {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Tekken 8', '06-28-2024', 'Fighting Game');
        });

        it('should accept an index to remove', function () {
            const spyRemoveItem = chai.spy.on(list, 'removeItem');
            const index = 1;
            list.removeItem(index);

            expect(spyRemoveItem).to.have.called.with(index);
        });

        it('should remove the item from the list and return it', function () {
            const index = 1;
            let game = list.removeItem(index);

            expect(game.title).to.equal('Elden Ring');
        });

        it('should adjust the index property of every item that comes after', function () {
            let index = 0;
            list.removeItem(index);

            expect(list.items[0].title).to.equal('Elden Ring');
            expect(list.items[0].index).to.equal(0);
            expect(list.items[1].title).to.equal('Tekken 8');
            expect(list.items[1].index).to.equal(1);
        });

    });

    describe('swap', function () {
        // For context, we are not leaping from index to index.
        // We are doing bubble sort with the index next to use.
        // Make sure your test reflect that.

        beforeEach(function () {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');
            list.addItem('Tekken 8', '01-20-6230', 'Fighting Game');
        });

        context('When we have a valid swap', function () {

            context('When the List.up calls this', function () {

                it('should swap the two indices in place', function () {
                    list.swap(2, 1); // (refernce, direction)

                    expect(list.items[1].title).to.equal('Console');
                    expect(list.items[2].title).to.equal('Elden Ring');
                });

                it('should swap the indices of the two items', function () {
                    list.swap(2, 1);

                    expect(list.items[1].title).to.equal('Console');
                    expect(list.items[2].title).to.equal('Elden Ring');

                    expect(list.items[1].index).to.equal(1);
                    expect(list.items[2].index).to.equal(2);
                });

            });

            context('When List.down calls this', function () {

                it('should swap the two indices in place', function () {
                    list.swap(2, -1);

                    expect(list.items[3].title).to.equal('Console');
                    expect(list.items[2].title).to.equal('Tekken 8');
                });

                it('should swap the indices of the two items', function () {
                    list.swap(2, -1);

                    expect(list.items[3].title).to.equal('Console');
                    expect(list.items[3].index).to.equal(3);

                    expect(list.items[2].title).to.equal('Tekken 8');
                    expect(list.items[2].index).to.equal(2);
                });

            });

        });

        context('When we do not have a valid swap', function () {

            it('should not swap the two items', function () {
                list.swap(0, 7);

                expect(list.items[0].title).to.equal('Controller');
                expect(list.items[1].title).to.equal('Elden Ring');
            });

        });

    });

    describe('up', function () {
        // This will utilize a while loop
        // We will continue to swap in till it hits zero

        // We spotted an edge case here.
        // If we switch the first and last item we have an issue. We can solve this with a
        // simple if statement but it will make our code messy.

        // list.up and list.down will be linear.
            // It will call swap and iterate and swap through adjacent items.
            // Make sure the methods reflect that!!!

        beforeEach(function () {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');
            list.addItem('Tekken 8', '01-20-6230', 'Fighting Game');
        });

        it('should call List.swap', function () {
            const spyUp = chai.spy.on(list, 'swap');
            list.up(0, 2);

            expect(spyUp).to.have.been.called;
            chai.spy.restore(list, 'swap');
        });

        it('should switch the switch the two elements (Item instances) in items', function () {
            list.up(0, 2);

            expect(list.items[0].title).to.equal('Controller');
            expect(list.items[0].index).to.equal(0);

            list.up(2, 2);

            expect(list.items[0].title).to.equal('Console');
            expect(list.items[0].index).to.equal(0);
            expect(list.items[1].title).to.equal('Controller');
            expect(list.items[1].index).to.equal(1);
        });

    });

    describe('down', function () {
        // This will utilize a while loop
        // We will continue to swap in till it hits zero

        // We spotted an edge case here.
        // If we switch the first and last item we have an issue. We can solve this with a
        // simple if statement but it will make our code messy.

        // list.up and list.down will be linear.
            // It will call swap and iterate and swap through adjacent items.
            // Make sure the methods reflect that!!!

        beforeEach(function() {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');
            list.addItem('Tekken 8', '01-20-6230', 'Fighting Game');
        });

        it('should swap call List.swap', function () {
            const spyUp = chai.spy.on(list, 'swap');
            list.down(0, 2);

            expect(spyUp).to.have.been.called;
            chai.spy.restore(list, 'swap');
        });

        it('should switch the switch the two elements (Item instances) in items', function () {
            list.down(3, 2);

            expect(list.items[3].title).to.equal('Tekken 8');
            expect(list.items[3].index).to.equal(3);

            list.down(0, 2);

            expect(list.items[2].title).to.equal('Controller');
            expect(list.items[2].index).to.equal(2);
            expect(list.items[1].title).to.equal('Console');
            expect(list.items[1].index).to.equal(1);
        });


    });

    describe('toggleItem', function () {

        beforeEach(function() {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
        });

        // We already tested if it was working properly. Just make sure to call it.
        it('should accept a single argument that represent an integer', function () {
            const spyToggleItem = chai.spy.on(list, 'toggleItem');
            const integer = 0;

            list.toggleItem(integer);

            expect(spyToggleItem).to.have.called.with(integer);
            chai.spy.restore(list, 'toggleItem');
        });

        it('should toggle the referenced item', function () {
            list.toggleItem(0);

            expect(list.items[0].done).to.be.true;
        });

    });

    describe('purgeItem', function () {

        // This is a linked list
        // The method should refer to list.purges
        // To create a node, refer to PurgeNode
        // To add a node refer to list.purges.enqueue or list.purges.dequeue to remove

        beforeEach(function () {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');
            list.addItem('Tekken 8', '01-20-6230', 'Fighting Game');
        });

        // context('When items is empty', function () {

        //     it(`should print 'There are no items in this list.label'`, function () {

        //     });

        // });

        context('When items is not empty', function () {

            it('should move the specified item into the linked list', function () {
                let index = 1;
                list.purgeItem(index);

                /*
                This will accept an index refering to the item we want to remove in items.
                We will call list.removeItem which will return an item and adjust the indices
                Then we will use the item and queue it into the list.purges.enqueue
                */

                expect(list.purges.length).to.equal(1);
                expect(list.purges.head.value.title).to.equal('Elden Ring');
                expect(list.length).to.equal(3);
            });

        });

    });

    describe('removeNode', function () {

        beforeEach(function() {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');
            list.addItem('Tekken 8', '01-20-6230', 'Fighting Game');
            list.purgeItem(1); // enqueuing into the linked list
        });

        it('should dequeue from a linked list and return the item', function () {
            let item = list.removeNode(); // as a node not item instance.

            expect(item.title).to.equal('Elden Ring');
            expect(item.index).to.equal(1);
        });

    });

    describe('undo', function () {

        // to replicate the undo we need to make sure that the item removed
        // returns back to its original index instead of just being push to the
        // back of the array.

        beforeEach(function() {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');
            list.addItem('Tekken 8', '01-20-6230', 'Fighting Game');
            list.purgeItem(1); // enqueuing into the linked list
        });

        it('should call list.removeNode', function () {
            const spyRemoveNode = chai.spy.on(list, 'removeNode');

            list.undo();

            expect(spyRemoveNode).to.have.been.called;
        });

        it('should add the removed node back into its original position in items', function () {
            list.undo();

            expect(list.items[1].title).to.equal('Elden Ring');
            expect(list.items[1].index).to.equal(1);
        });

        it('should update the indices of the items that comes after the recently added item', function () {
            list.undo();

            expect(list.items[3].title).to.equal('Tekken 8');
            expect(list.items[3].index).to.equal(3);

            expect(list.items[2].title).to.equal('Console');
            expect(list.items[2].index).to.equal(2);
        });

    });

    describe('removeMarkTasks', function () {

        beforeEach(function() {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');
            list.addItem('Tekken 8', '01-20-6230', 'Fighting Game');
            list.toggleItem(1);
            list.toggleItem(3);
        });

        it('should remove all mark task and add them to purges', function () {
            list.removeMarkTasks();

            expect(list.purges.head.value.title).to.equal('Elden Ring');
            expect(list.purges.tail.value.title).to.equal('Tekken 8');
        });

        it('should update the indices from removing all the mark task', function () {
            list.removeMarkTasks();

            expect(list.items[1].index).to.equal(1);
            expect(list.items[1].title).to.equal('Console');
        });

    });

    // printing items

    describe('priority', function () {

        beforeEach(function() {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
        });

        it('should return the first index of list.items', function () {
            let item = list.priority();

            expect(item.title).to.equal('Controller');
        });

    });

    describe('sortByDeadline', function () {

        // There will be two nested function expressions
            // One that will sort by acsending and decsending order

        beforeEach(function() {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');
            list.addItem('Tekken 8', '01-20-6230', 'Fighting Game');
        });

        context('descending order', function () {

            it('should sort and muntate items based on earliest ', function () {
                let input = 'decsending';
                list.sortByDeadline(input) // There will be a defualt function

                expect(list.items[0].title).to.equal('Tekken 8');
                expect(list.items[1].title).to.equal('Console');
                expect(list.items[2].title).to.equal('Controller');
                expect(list.items[3].title).to.equal('Elden Ring');
            });

        });

        context('ascending order', function () {

            it('should sort and muntate items based on earliest ', function () {
                let input = 'acsending';
                list.sortByDeadline(input) // There will be a defualt function

                expect(list.items[0].title).to.equal('Elden Ring');
                expect(list.items[1].title).to.equal('Controller');
                expect(list.items[2].title).to.equal('Console');
                expect(list.items[3].title).to.equal('Tekken 8');
            });

        });

    });

});
