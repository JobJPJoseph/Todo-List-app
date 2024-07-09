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

    let node;

    let item;

    beforeEach(function () {
        item = new Item(title, correctFormat, description);

        node = new PurgeNode(item, null, null);
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

    expect(Purge).to.exist;

    describe('Constructor', function () {
        // Linked List
        let linkedList;

        // Items
        let groceries;
        let wallArt;
        let carpet;

        // Just a node
        let groceriesNode;
        let wallArtNode;
        let carpetNode;

        beforEach(function () {
            groceries = new Item(title, correctFormat, description);
            groceriesNode = new PurgeNode(groceries, null, null);

            wallArt = new Item('WallArt', '02-23-1975', 'decoration for the room');
            wallArtNode = new PurgeNode(wallArt, null, null);


            carpet = new Item('Carpet', '04-25-1957', 'decoration for the room');
            carpetNode = new PurgeNode(carpet, null, null);

            linkedList = new Purge();
        })

        it('should initialize a property called head and tail that should be set to null', function () {
            expect(linkedList.head).to.be.null;
            expect(linkedList.tail).to.be.null;
        });

        it('should initialize a property called length and be set to 0', function () {
            expect(linkedList.length).to.equal(0);
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
                });

            });

        });

    });

});
