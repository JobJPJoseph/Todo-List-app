const TodoBoard = require('../lib/todo-board');
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

        it('should initialize a property called allCommands that should be an object', function () {
            expect(todo.allCommands).to.be.an('object');
        });

        it('should initialize an object that contains all possible commands', function () {
            const commands = todo.allCommands;

            expect(commands.mklist).to.equal('mklist');
            expect(commands.ls).to.equal('ls');
            expect(commands.showall).to.equal('showall');
            expect(commands.mktodo).to.equal('mktodo');
            expect(commands.toggle).to.equal('toggle');
            expect(commands.rm).to.equal('rm');
            expect(commands.purge).to.equal('purge'); // changed
            expect(commands.up).to.equal('up');
            expect(commands.down).to.equal('down');
            expect(commands.swap).to.equal('swap');
            expect(commands.undo).to.equal('undo'); // new
            expect(commands.sort).to.equal('sort');
            expect(commands.priority).to.equal('priority');
            expect(commands.print).to.equal('print');
            expect(commands.quit).to.equal('quit');
        });

        // commands should also have descriptions of what they expect though

    });

    describe('getCommand', function () {

        context('asynchronous' , function () {

            it('should input should be a string data type', async function () {
                let input = await todo.getCommand();
                return expect(input).to.be.a('string');
            });

            // the first input is a command. Anything that comes after is a argument.
            // each command or argument must have a space in between.

            // 'command listName arg arg arg....'
            // index 0 === is the command
            // index 1 === listName
            // index 2 and onwards === depends

            context('multiple arguments', async function () {

                it('', function () {

                });

            });

            context('single commands', function () {

            });

        });

        // lets make sure to get the command in the right format
        // context('isCorrectFormat', function () {

        //     it('', function () {

        //     });

        // });

    });



});
