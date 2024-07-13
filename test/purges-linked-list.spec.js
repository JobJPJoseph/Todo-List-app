const { Purge, PurgeNode } = require('../lib/purges-linked-list');
const Item = require('../lib/item');

const chai = require("chai");

const expect = chai.expect;

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
    let groceries;
    let wallArt;
    let carpet;

    //
    const correctFormat = '01-09-1198';
    const title = 'Shopping';
    const description = 'Groceries';

    // Just a node
    let groceriesNode;
    let wallArtNode;
    let carpetNode;

    beforeEach(function () {
        groceries = new Item(title, correctFormat, description);
        groceriesNode = new PurgeNode(groceries);

        wallArt = new Item('WallArt', '02-23-1975', 'decoration for the room');
        wallArtNode = new PurgeNode(wallArt);


        carpet = new Item('Carpet', '04-25-1957', 'decoration for the room');
        carpetNode = new PurgeNode(carpet);

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

            it('should set the node as the head and as the tail', function () {
                linkedList.enqueue(groceriesNode);
                expect(linkedList.head).to.equal(groceriesNode);
                expect(linkedList.tail).to.equal(groceriesNode);
            });

            it('should add to the length property', function () {
                linkedList.enqueue(groceriesNode);
                expect(linkedList.length).to.equal(1);
            });

        });

        context('When the linked List is not empty', function () {

            it('should add the node to the end of the linked list or the current tail', function () {
                linkedList.enqueue(groceriesNode);
                linkedList.enqueue(wallArtNode);

                expect(linkedList.head).to.equal(groceriesNode);
                expect(linkedList.tail).to.equal(wallArtNode);
                expect(groceriesNode.next).to.equal(wallArtNode);
                expect(wallArtNode.prev).to.equal(groceriesNode);
            });

            it('should add to the length property', function () {
                linkedList.enqueue(groceriesNode);
                linkedList.enqueue(wallArtNode);

                expect(linkedList.length).to.equal(2);
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

                expect(node).to.deep.equal(groceries);
                expect(linkedList.head).to.be.null;
                expect(linkedList.tail).to.be.null;

                linkedList.enqueue(carpetNode);
                linkedList.enqueue(wallArtNode);

                let node1 = linkedList.dequeue();

                expect(node1).to.deep.equal(wallArtNode);
                expect(linkedList.head).to.deep.equal(carpetNode);
                expect(linkedList.tail).to.deep.equal(carpetNode);
            });

            it('should decrement the length', function () {
                linkedList.enqueue(carpetNode);
                linkedList.enqueue(groceriesNode);

                linkedList.dequeue();

                expect(linkedList.length).to.equal(1);
            });

        });

    });

});
