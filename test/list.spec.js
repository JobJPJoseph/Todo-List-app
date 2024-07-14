const List = require("../lib/list");
const Item = require("../lib/item");
const { Purge, PurgeNode } = require('../lib/purges-linked-list');

const chai = require("chai");

const expect = chai.expect;

const spies = require("chai-spies");

describe("List class", function () {

    it('should initalize the List class', function () {
        expect(List).to.exist;
    });

    // list class
    let list;

    // item class
    let controller;
    let videoGame;

    // purge class
    let linkedList;

    describe('Constructor', function () {

        beforeEach(function () {
            // controller = new Item('Controller', '10-25-2025', 'For the PS5');

            // videoGame = new Item('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');

            list = new List('Gaming console');
        });

        it('should initialize a property called label', function () {
            expect(list.label).to.equal('Gaming console');
        });

        it('should initialize a property that is an array type called items', function () {
            expect(list.items).to.be.a.array;
        });

        it('should preallocate 10 indices for the items property', function () {
            expect(list.items.length).to.equal(10);
        });

        it('should initialize a property called length that represents the number of instances in items', function () {
            expect(list.length).to.equal(0);
        });

        it('should initialize a property called purges that should represent a linked list', function () {
            expect(list.purges).to.be.null;
        });

    });

    describe('addItem', function () {

        context('When the item is valid', function () {

            it('should create an instance of Item and push it into the items property', function () {
                list.addItem('Controller', '10-25-2025', 'For the PS5');
                expect(list.length).to.equal(1);
            });

        });

        context('When the item is not valid', function () {

            it('should throw an Error when the deadline is not valid', function () {
                expect(() => list.addItem('Controller', '10252025', 'For the PS5')).to.throw(Error).with.property('message').that.includes('deadline was in an invalid format');
            });

        });

    });

});
