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

        describe('mklist', function () {

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

        describe('ls', function () {
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

        describe('showall', function () {

            context('When no arguments', function () {
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
                    expect(spyConsole).to.have.been.called;
                });

            });

            context('When there are arguments', function () {
                let spyConsoleError;

                beforeEach(function () {
                    spyConsoleError = chai.spy.on(console, 'error');
                });

                afterEach(function () {
                    chai.spy.restore(console, 'error');
                });

                it('should return an Error instance and console an Error message', function () {
                    todo.allCommands.mklist.execute('Groceries');
                    let result = todo.allCommands.showall.execute('Groceries');

                    expect(result).to.be.an.instanceOf(Error);
                    expect(result.message).to.equal(`No arguments needed`);
                    expect(spyConsoleError).to.have.been.called
                });

            });

        });

        describe('mktodo', function () {

            context('When no argument is received or too many', function () {
                let spyConsoleError;

                beforeEach(function () {
                    spyConsoleError = chai.spy.on(console, 'log');
                });

                afterEach(function () {
                    chai.spy.restore(console, 'log');
                });

                it('should return an Error instance and console an error message', function () {
                    // Just say incorrect amount of arguments
                    // i === 4

                    todo.allCommands.mklist.execute('Books');
                    let result = todo.allCommands.mktodo.execute('Books','Bleach', '12-20-2024', 'Fiction', 'At Thursday');

                    expect(result).to.be.an.instanceOf(Error);
                    expect(result.message).to.equal('Incorrect amount of arguments');
                    expect(spyConsoleError).to.have.been.called;
                });

            });

            context('When arguments are recieved', function () {

                it('should add an item instance into a list', function () {
                    todo.allCommands.mklist.execute('Groceries');
                    todo.allCommands.mktodo.execute('Groceries', 'potatoes', '10-20-2010', 'For cooking');

                    expect(todo.board['groceries'].items[0].title).to.equal('potatoes');
                });

            });

        });

        describe('toggle', function () {

            context('When no argument is received or too many', function () {
                let spyConsoleError;

                beforeEach(function () {
                    spyConsoleError = chai.spy.on(console, 'log');
                });

                afterEach(function () {
                    chai.spy.restore(console, 'log');
                });

                it('should return an Error instance and console an error message', function () {
                    todo.allCommands.mklist.execute('Books');
                    todo.allCommands.mktodo.execute('Books','Bleach', '12-20-2024', 'Fiction');
                    let result = todo.allCommands.toggle.execute('Books', 'Bleach', 'dsfsars');

                    expect(result).to.be.an.instanceOf(Error);
                    expect(result.message).to.equal('Incorrect amount of arguments');
                    expect(spyConsoleError).to.have.been.called;
                });

            });

            context('When we have the correct amount of arguments', function () {

                it('should switch item done property to true', function () {
                    todo.allCommands.mklist.execute('Books');
                    todo.allCommands.mktodo.execute('Books','Bleach', '12-20-2024', 'Fiction');
                    todo.allCommands.toggle.execute('Books', 'Bleach');

                    expect(todo.board['books'].items[0].done).to.be.true;
                });

            });

        });

        describe('rm', function () {

            context('When no argument is received or too many', function () {
                let spyConsoleError;

                beforeEach(function () {
                    spyConsoleError = chai.spy.on(console, 'log');
                });

                afterEach(function () {
                    chai.spy.restore(console, 'log');
                });

                it('should return an Error instance and console an error message', function () {
                    todo.allCommands.mklist.execute('Books');
                    todo.allCommands.mktodo.execute('Books','Bleach', '12-20-2024', 'Fiction');
                    let result = todo.allCommands.rm.execute('Books', 0, 58);

                    expect(result).to.be.an.instanceOf(Error);
                    expect(result.message).to.equal('Incorrect amount of arguments');
                    expect(spyConsoleError).to.have.been.called;
                });

            });

            context('When we have the correct amount of arguments', function () {

                it('should remove item from specified list', function () {
                    todo.allCommands.mklist.execute('Books');
                    todo.allCommands.mktodo.execute('Books', 'Bleach', '12-20-2024', 'Fiction');
                    todo.allCommands.mktodo.execute('Books', 'Burn the Witch', '10-20-2024', 'non-Fiction');
                    todo.allCommands.rm.execute('Books', 0);

                    expect(todo.board['books'].items[0].title).to.equal('Burn the Witch');
                });

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
