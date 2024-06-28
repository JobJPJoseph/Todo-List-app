const Item = require('../lib/item');

const chai = require('chai');

const spies = require('chai-spies');

const expect = chai.expect;

chai.use(spies);

// Make sure to update "main" in your package.json file so that there is no issue running your tests.

describe('Item class', function () {

    it('the Item class should exist', function () {
        expect(Item).to.exist;
    });

    describe("validDate", function () {
        const wrongType = 12345;
        const lessThanTenLetters = 'abcdef';
        const noDash = 'abcdefghei';
        const withDash = 'b5-15-3s1d';
        const correctFormat = '01-09-1198';


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

});
