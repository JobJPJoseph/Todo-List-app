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
            controller = new Item('Constroller', '10-25-2025', 'For the PS5');

            videoGame = new Item('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');

            list = new List('Gaming console');
        });

        it('should initialize a property called label', function () {
            expect(list.label).to.equal('Gaming console');
        });

        it('should initialize a property that is an array type called items', function () {
            expect(list.items).to.be.a.array;
        });

        it('should initialize a property called purges that should represent a linked list', function () {
            expect(list.purges).to.be.null;
        });

    });

});
