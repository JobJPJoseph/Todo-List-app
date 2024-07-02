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
    let item;

    before(function () {
        item = new Item(title, correctFormat, description);
        purgeNode = new PurgeNode(item, null, null);
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

        let purge;

        before(function () {
            purge = new Purge();
        })

        it('should initialize a property called head and tail that should be set to null', function () {
            expect(purge.head).to.be.null;
            expect(purge.tail).to.be.null;
        });

        it('should initialize a property called length and be set to 0', function () {
            expect(purge.length).to.equal(0);
        });

    });

});
