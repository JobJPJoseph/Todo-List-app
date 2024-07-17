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

    // Please check the logic on swap, up, down. It does not make sense.
    // Swap, up, down, removeItem all call or lead into isValidIndex. Its redundant
    // We could make it work if we change the conext but from the main class
    // This test will be moved to the Board spec file.

    // describe('isValidIndex', function () {

    //     it('should accept a single argument', function () {
    //         const spyIsValidIndex = chai.spy.on(list, 'isValidIndex');
    //         let integer = 2;
    //         list.spyIsValidIndex(integer);
    //         expect(spyIsValidIndex).to.have.been.called.with(integer);
    //         chai.spy.restore(list, 'isValidIndex');
    //     });

    //     context('when in range', function () {

    //         it('should return true', function () {
    //             list.addItem('Controller', '10-25-2025', 'For the PS5');
    //             list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
    //             expect(list.isValidIndex(1)).to.be.true;
    //         });

    //     });

    //     context('when not in range', function () {

    //         it('should return false', function () {
    //             expect(list.isValidIndex(5)).to.be.false;
    //         });

    //     });

    // });

    describe('swap', function () {

        let controller = new Item('Controller', '10-25-2025', 'For the PS5');
        let videoGame = new Item('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');

        context('When we have a valid swap', function () {

            it('should swap the two indices in place', function () {
                list.addItem('Controller', '10-25-2025', 'For the PS5');
                list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');

                list.swap(0, 1);

                expect(list.items[0]).to.deep.equal(videoGame);
                expect(list.items[1]).to.deep.equal(controller);

            });

        });

        context('When we do not have a valid swap', function () {

            it('should not swap the two items', function () {
                list.addItem('Controller', '10-25-2025', 'For the PS5');
                list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');

                list.swap(0, 7);

                expect(list.items[0]).to.deep.equal(controller);
                expect(list.items[1]).to.deep.equal(videoGame);
            });

        });

    });

    describe('up', function () {
        // This will utilize a while loop
        // We will continue to swap in till it hits zero

        it('should swap call List.swap', function () {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');

            const spyUp = chai.spy.on(list, 'swap');
            list.up(0, 2);

            expect(spyUp).to.have.been.called;
        });

        it('should switch the switch the two elements (Item instances) in items', function () {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');

            list.up(0, 5);

            expect(list.items[1]).to.deep.equal(controller);
            expect(list.items[0]).to.deep.equal(videoGame);
        });

    });

    describe('down', function () {
        // This will utilize a while loop
        // We will continue to swap in till it hits zero

        it('should swap call List.swap', function () {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');

            const spyUp = chai.spy.on(list, 'swap');
            list.up(0, 2);

            expect(spyUp).to.have.been.called;
        });

        it('should switch the switch the two elements (Item instances) in items', function () {
            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.addItem('Elden Ring', '06-22-2024', 'Shadow of the Erdtree');
            list.addItem('Console', '04-12-2026', 'PS5 Console');

            list.down(0, 5);

            expect(list.items[2]).to.deep.equal(controller);
            expect(list.items[1]).to.deep.equal(videoGame);
        });

    });

    describe('toggleItem', function () {

        // We already tested if it was working properly. Just make sure to call it.
        it('should accept a single argument that represent an integer', function () {
            const spyToggleItem = chai.spy.on(list, 'toggleItem');
            const integer = 0;

            list.addItem('Controller', '10-25-2025', 'For the PS5');
            list.toggleItem(integer);

            expect(spyToggleItem).to.have.called.with(integer);
            chai.spy.restore(list, 'toggleItem');
        });

        it('should call item.toggle on the first index of items', function () {
            list.addItem('Controller', '10-25-2025', 'For the PS5');

            list.toggleItem(0);

            expect(list.items[0].mark).to.equal(`[${String.fromCharCode(10003)}]`);
        });

    });

    describe('purge_Item', function () {

    });

});
