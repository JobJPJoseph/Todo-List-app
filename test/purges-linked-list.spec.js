const { Purge, PurgeNode } = require('../lib/purges-linked-list');
const Item = require('../lib/item');

const chai = require("chai");

const expect = chai.expect;

const spies = require("chai-spies");

describe('Linked List Node Class', function () {

    it('should initialize the PurgeNode class', function () {
        expect(PurgeNode).to.exist;
    });

    const correctFormat = '01-09-1198';
    const title = 'Shopping';
    const description = 'Groceries';

    let purgeNode;
    let nextPurgeNode;
    let prevPurgeNode;

    let item;
    let nextItem;
    let prevItem;

    before(function () {
        item = new Item(title, correctFormat, description);
        // nextItem = new Item('WallArt', '02-23-1975', 'decoration for the room');
        // prevItem = new Item('Carpet', '04-25-1957', 'decoration for the room');

        purgeNode = new PurgeNode(item, null, null);
        // nextPurgeNode = new PurgeNode(nextItem, null, null);
        // prevPurgeNode = new PurgeNode(prevItem, null, null);
    });

    describe('Constructor', function () {

        it('should initialize a value that represent an instance of Item', function () {
            expect(purgeNode.value).to.deep.equal(item);
        });

        it('by defualt the next and prev property should be set to null', function () {
            expect(purgeNode.prev).to.be.null;
            expect(purgeNode.next).to.be.null;
        });

    });

});

describe('Purge class', function () {

    expect(Purge).to.exist;

    describe('Constructor', function () {
        // Linked List
        let purge;

        // Items
        let item;
        let nextItem;
        let prevItem;

        // Just a node
        let purgeNode;
        let nextPurgeNode;
        let prevPurgeNode;

        before(function () {
            purge = new Purge();

            item = new Item(title, correctFormat, description);
            nextItem = new Item('WallArt', '02-23-1975', 'decoration for the room');
            prevItem = new Item('Carpet', '04-25-1957', 'decoration for the room');

            purgeNode = new PurgeNode(item, null, null);
            nextPurgeNode = new PurgeNode(nextItem, null, null);
            prevPurgeNode = new PurgeNode(prevItem, null, null);
        })

        it('should initialize a property called head and tail that should be set to null', function () {
            expect(purge.head).to.be.null;
            expect(purge.tail).to.be.null;
        });

        it('should initialize a property called length and be set to 0', function () {
            expect(purge.length).to.equal(0);
        });

        // We are only working with enqueue and dequeue as FIFO
        // Both should be O(1) in Time complexity

        describe('enqueue', function () {

            context('When the Linked List is empty', function () {

                it('should set the node as the head and as the tail', function () {
                    expect(purge.head).to.equal(purgeNode);
                    expect(purge.tail).to.equal(purgeNode);
                });

                it('should add to the length property', function () {
                    expect(purge.length).to.equal(1);
                });

            });

            context('When the linked List is not empty', function () {

                it('should add the node to the end of the linked list or the current tail', function () {
                    expect(purge.head).to.equal(purgeNode);
                    expect(purge.tail).to.equal(nextPurgeNode);
                    expect(purgeNode.next).to.equal(nextPurgeNode);
                    expect(nextPurgeNode.prev).to.equal(purgeNode);
                });

                it('should add to the length property', function () {
                    expect(purge.length).to.equal(2);
                });

            });

        });

        describe('dequeue', function () {

            context('When the Linked List is empty', function () {

            });

            context('When the linked List is not empty', function () {

            });

        });

    });

});
