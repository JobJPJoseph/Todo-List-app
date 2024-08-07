const Item = require('../lib/item');

const chai = require('chai');

const spies = require('chai-spies');

const expect = chai.expect;

chai.use(spies);

describe('Item class', function () {

    const wrongType = 12345;
    const lessThanTenLetters = 'abcdef';
    const noDash = 'abcdefghei';
    const withDash = 'b5-15-3s1d';
    const correctFormat = '01-09-1198';

    const title = 'Shopping';
    const description = 'Groceries';

    it('the Item class should exist', function () {
        expect(Item).to.exist;
    });

    describe("validDate", function () {

        it('should return false when argument is not a string type', function () {
            expect(Item.isValidDate(wrongType)).to.be.false;
        });

        it('should return false when its not the correct length', function () {
            expect(Item.isValidDate(lessThanTenLetters)).to.be.false;
        });

        it('should return false when count of dashes does not equal two', function () {
            expect(Item.isValidDate(noDash)).to.be.false;
        });

        it('should return false when the elements in between the dashes are not integers', function () {
            expect(Item.isValidDate(withDash)).to.be.false;
        });

        it('should return true when properly formated', function () {
            expect(Item.isValidDate(correctFormat)).to.be.true;
        });

    });

    describe("Constructor", function () {

        let validItem;

        beforeEach(function () {
            validItem = new Item(title, correctFormat, description);
        });

        it('should initialize title and description', function () {
            expect(validItem.title).to.equal(title);

            expect(validItem.description).to.equal(description);
        });

        it('should set a property called done and set it to false', function () {
            expect(validItem.done).to.be.false;
        });


        it('should initialize property called index and set it to null', function () {
            expect(validItem.index).to.be.null;
        });

        context('When validDate is true', function () {

            it('should initailize deadline', function () {
                expect(validItem.deadline).to.equal(correctFormat);
            });

        });

        context('When validDate is false', function () {

            it("should raise an error and print out: 'deadline was in an invalid format'", function () {
                expect(() => new Item(title, noDash, description)).to.throw(Error).with.property('message').that.includes('deadline was in an invalid format');
            });

        });


    });

    describe('toggle', function () {
        let item;

        before(function () {
            item = new Item(title, correctFormat, description);
        })

        it("when called, if done is false, should be assignment to true", function () {
            item.toggle();
            expect(item.done).to.be.true;
        });

        it('when called, if done is true, should be assignment to false', function () {
            item.toggle();
            expect(item.done).to.be.false;
        });

    });

    describe('mark', function () {

        let item;

        beforeEach(function () {
            item = new Item(title, correctFormat, description);
        })

        afterEach(function () {
            chai.spy.restore(item, 'toggle');
        });

        context("When 'done' is false", function () {

            it("should return an empty array as a string", function () {
                expect(item.mark()).to.equal(`[ ]`);
            });

            it('should call toggle', function () {
                const toggleSpy = chai.spy.on(item, 'toggle');
                item.mark();
                expect(toggleSpy).to.have.been.called;
            });

        });

        context("When 'done' is true", function () {

            it("should return a checkmark", function () {
                item.mark();
                expect(item.mark()).to.equal(`[${String.fromCharCode(10003)}]`);
            });

            it('should call toggle', function () {
                const toggleSpy = chai.spy.on(item, 'toggle');
                item.mark();
                item.mark();
                expect(toggleSpy).to.have.been.called;
            });

        });

    });

});
