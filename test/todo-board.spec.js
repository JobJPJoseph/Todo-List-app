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

            expect(commands.mklist, 'mklist').to.be.an('object'); // makes new
            expect(commands.ls, 'ls').to.be.an('object'); // print every list label
            expect(commands.showall, 'showall').to.be.an('object'); // print every list info
            expect(commands.mktodo, 'mktodo').to.be.an('object'); // makes item for specified list
            expect(commands.toggle, 'toggle').to.be.an('object'); // calls item.mark() (list.toggleItem(reference))
            expect(commands.rm, 'rm').to.be.an('object'); // removes referenced item (list.purgeItem(refernce))
            // expect(commands.purge).to.be.an('object'); // changed
            expect(commands.up, 'up').to.be.an('object'); // moves referenced item up
            expect(commands.down, 'down').to.be.an('object'); // moves referenced item down
            // expect(commands.swap).to.be.an('object'); // not a command (will be called by up and down)
            expect(commands.undo, 'undo').to.be.an('object'); // adds back in the items for that list
            expect(commands.sort, 'sort').to.be.an('object');  // sort specific list by deadline
            expect(commands.priority, 'priority').to.be.an('object'); // print first item
            expect(commands.print, 'print').to.be.an('object'); // print list
            expect(commands.quit, 'quit').to.be.an('object'); // exit app
        });

        context('mklist', function () {

            // We need to test if the amount of arguments is correct
                // We are only expecting one argument
            // The function will call this.board[...arg]

            it('should initialize a property called arguments', function () {
                expect(todo.allCommands.mklist.arguments).to.be.an('array');
            });

            it('should be a length of zero', function () {
                expect(todo.allCommands.mklist.arguments.length).to.equal(0);
            });

            context('mklist.execute', function () {

                context('When amount of arguments is not equal to one', function () {
                    let spyConsoleError;

                    beforeEach(function () {
                        spyConsoleError = chai.spy.on(console, 'error');
                    });

                    afterEach(function () {
                        chai.spy.restore(console, 'error');
                    });

                    it('should return an Error object and log an error message', function () {
                        let result = todo.allCommands.mklist.execute('Groceries', 'lets', ' go', 'up');

                        expect(result).to.be.an.instanceOf(Error);
                        expect(result.message).to.equal(`Too many arguments`);
                        expect(spyConsoleError).to.have.been.called.with(`Too many arguments`);
                    });

                });


                context('When the list instance is not initialized', function () {

                    it('should initialize a property called execute that should be a function', function () {
                        expect(todo.allCommands.mklist.execute).to.be.a('function');
                    });

                    it('should create a list instance and assign it as a property of todo.board', function () {
                        todo.allCommands.mklist.execute('Groceries');
                        expect(todo.board.groceries.label).to.equal('Groceries');
                    });

                });

                context('When the list instance is already initialized', function () {
                    let spyConsoleError;

                    beforeEach(function () {
                        todo = new TodoBoard();
                        spyConsoleError = chai.spy.on(console, 'error');
                    });

                    afterEach(function () {
                        chai.spy.restore(console, 'error');
                    });

                    it('should return an Error object and log an error message', function () {
                        let input = 'Groceries';
                        todo.allCommands.mklist.execute(input);

                        const result = todo.allCommands.mklist.execute(input);

                        expect(result).to.be.an.instanceOf(Error);
                        expect(result.message).to.equal(`${input} is already included in the list.`);
                        expect(spyConsoleError).to.have.been.called.with(`${input} is already included in the list.`);
                    });

                });

            });

        });

        context('ls', function () {
            let spyConsole;

            beforeEach(function () {
                spyConsole = chai.spy.on(console, 'log');
            });

            afterEach(function () {
                chai.spy.restore(console, 'log');
            });

            it('should console.log this.board keys', function () {
                todo.allCommands.mklist.execute('Groceries');
                todo.allCommands.ls.execute();
                expect(spyConsole).to.have.been.called.with(['groceries']);
            });

        });

        context('showall', function () {
            let spyConsole;

            beforeEach(function () {
                todo.allCommands.mklist.execute('Groceries');
                todo.board['groceries'].addItem('burger', '01-22-2025', 'For the Party');

                spyConsole = chai.spy.on(console, 'log');
            });

            afterEach(function () {
                chai.spy.restore(console, 'log');
            });

            it('should console.log Object.values(this.board)', function () {
                todo.allCommands.showall.execute();
                expect(spyConsole).to.have.been.called.with(todo.board['groceries'].printBoard());
            });

        });

    });

    // describe('getCommand', function () {

    //     context('asynchronous' , function () {

    //         // it('should input should be a string data type', async function () {
    //         //     let input = await todo.getCommand();
    //         //     return expect(input).to.be.a('string');
    //         // });

    //         // the first input is a command. Anything that comes after is a argument.
    //         // each command or argument must have a space in between.

    //         // 'command listName arg arg arg....'
    //         // index 0 === is the command
    //         // index 1 === listName
    //         // index 2 and onwards === depends

    //         // context('multiple arguments', async function () {

    //         //     it('', function () {

    //         //     });

    //         // });

    //         // context('single commands', function () {

    //         // });

    //     });

    //     // lets make sure to get the command in the right format
    //     // context('isCorrectFormat', function () {

    //     //     it('', function () {

    //     //     });

    //     // });

    // });

});
