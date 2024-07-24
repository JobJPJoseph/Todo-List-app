const { Purge, PurgeNode } = require('../lib/purges-linked-list');
const Item = require('../lib/item');

const chai = require("chai");

const expect = chai.expect;

const spies = require('chai-spies');

chai.use(spies);

describe('PurgeNode Class', function () {

    it('should initialize the PurgeNode class', function () {
        expect(PurgeNode).to.exist;
    });

    const correctFormat = '01-09-1198';
    const title = 'Shopping';
    const description = 'Groceries';

    let item;

    let node;

    beforeEach(function () {
        item = new Item(title, correctFormat, description);

        node = new PurgeNode(item);
    });

    describe('Constructor', function () {

        it('should initialize a value that represent an instance of Item', function () {
            expect(node.value).to.deep.equal(item);
        });

        it('by defualt the next and prev property should be set to null', function () {
            expect(node.prev).to.be.null;
            expect(node.next).to.be.null;
        });

    });

});

describe('Purge class', function () {

    it('should initialize the Purge class', function () {
        expect(Purge).to.exist;
    });

    // Linked List
    let linkedList;

    // Items
    let groceries, wallArt, carpet;

    //
    const correctFormat = '01-09-1198';
    const title = 'Shopping';
    const description = 'Groceries';

    // Just a node

    beforeEach(function () {
        groceries = new Item(title, correctFormat, description);

        wallArt = new Item('WallArt', '02-23-1975', 'decoration for the room');

        carpet = new Item('Carpet', '04-25-1957', 'decoration for the room');

        linkedList = new Purge();
    });

    describe('Constructor', function () {

        it('should initialize a property called head and tail that should be set to null', function () {
            expect(linkedList.head).to.be.null;
            expect(linkedList.tail).to.be.null;
        });

        it('should initialize a property called length and be set to 0', function () {
            expect(linkedList.length).to.equal(0);
        });

    });

    // We are only working with enqueue and dequeue as FIFO
    // Both should be O(1) in Time complexity

    describe('enqueue', function () {

        context('When the Linked List is empty', function () {

            it('should call new PurgeNode for each item', function () {
                const spyPurgeNode = chai.spy.on(global, 'PurgeNode');
                linkedList.enqueue(groceries);
                expect(spyPurgeNode).to.have.been.called;
                chai.spy.restore(global, 'PurgeNode');
            });

            it('should set the node as the head and as the tail', function () {
                linkedList.enqueue(groceries);
                expect(linkedList.head.value).to.deep.equal(groceries);
                expect(linkedList.tail.value).to.deep.equal(groceries);
            });

            it('should add to the length property', function () {
                linkedList.enqueue(groceries);
                expect(linkedList.length).to.equal(1);
            });

        });

        context('When the linked List is not empty', function () {

            it('should call new PurgeNode() for each item', function () {
                const PurgeNodeSpy = chai.spy.on(global, 'PurgeNode');
                linkedList.enqueue(groceries);
                linkedList.enqueue(wallArt);
                expect(PurgeNodeSpy).to.have.been.called;
                chai.spy.restore(global, 'PurgeNode');
            });

            it('should add the node to the end of the linked list or the current tail', function () {
                linkedList.enqueue(groceries);
                linkedList.enqueue(wallArt);

                expect(linkedList.head.value).to.deep.equal(groceries);
                expect(linkedList.tail.value).to.deep.equal(wallArt);
            });

            it('should add to the length property', function () {
                linkedList.enqueue(groceries);
                linkedList.enqueue(wallArt);

                expect(linkedList.length).to.equal(2);
            });

        });

        context('Edge cases', function () {

            it('should handle enqueueing null or undefined', function () {
                expect(() => linkedList.enqueue(null)).to.throw(Error).with.property('message').that.includes('argument is not the correct type');
                expect(() => linkedList.enqueue(undefined)).to.throw(Error).with.property('message').that.includes('argument is not the correct type');
            });

        });

    });

    describe('dequeue', function () {

        context('When the Linked List is empty', function () {

            it('should return null when the linked list is empty', function () {
                expect(linkedList.dequeue()).to.be.null;
            });

        });

        context('When the linked List is not empty', function () {

            it('should return the removed node', function () {
                linkedList.enqueue(groceries);
                const node = linkedList.dequeue();

                expect(node.value).to.deep.equal(groceries);
                expect(linkedList.head).to.be.null;
                expect(linkedList.tail).to.be.null;

                linkedList.enqueue(carpet);
                linkedList.enqueue(wallArt);

                let node1 = linkedList.dequeue();

                expect(node1.value).to.deep.equal(wallArt);
                expect(linkedList.head.value).to.deep.equal(carpet);
                expect(linkedList.tail.value).to.deep.equal(carpet);
            });

            it('should decrement the length', function () {
                linkedList.enqueue(carpet);
                linkedList.enqueue(groceries);

                linkedList.dequeue();

                expect(linkedList.length).to.equal(1);
            });

        });

    });

});
