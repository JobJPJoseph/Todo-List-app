// const TodoBoard = require('../lib/todo-board');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

describe('Todo Board', function () {

    it('should initialize the Todo Board class', function () {
        expect(TodoBoard).to.exist;
    });

    let todo;

    beforeEach(function () {
        todo = new TodoBoard();
    });

    describe('constructor', function () {

        it('should initialize an empty object called board', function () {
            expect(todo.board).to.be.an('object');
        });

    });



});
