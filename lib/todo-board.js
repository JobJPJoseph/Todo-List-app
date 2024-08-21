const { exit } = require('process');
const List = require('../lib/list');
const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

class TodoBoard {

    constructor() {
        this.board = {};
        this.allCommands = {
            mklist: {
                execute: (...input) => {

                    if (input.length !== 1) {
                        console.error('Expecting a List Name: ');
                        return new Error('Expecting a List Name: ')
                    }

                    let subInput = input[0];

                    if (this.board[subInput.toLowerCase()] !== undefined) {
                        console.error(`${subInput} is already included in the list.`);
                        return new Error(`${subInput} is already included in the list.`);
                    }

                    this.board[subInput.toLowerCase()] = new List(subInput);
                }
            },
            ls: {
                execute: (...input) => {

                    if (input.length) {
                        console.error('No arguments needed');
                        return new Error('No arguments needed');
                    }

                    console.log(Object.keys(this.board));
                }
            },
            showall: {
                execute: (...args) => {
                    if (args.length !== 0) {
                        console.error('No arguments needed');
                        return new Error('No arguments needed');
                    }
                    // does not account for undefined or empty items
                    for (let pair in this.board) {
                        // If the list is removed than this will cause an error
                        this.board[pair].printBoard();
                    }
                }
            },
            mktodo: {
                execute: (...args) => {
                    if (args.length !== 4) {
                        console.error('Incorrect amount of arguments');
                        return new Error('Incorrect amount of arguments');
                    }

                    let reference = args[0].toLowerCase();
                    let inputs = args.slice(1);

                    this.board[reference].addItem(...inputs);
                }
            },
            toggle: {
                execute: (...args) => {
                    if (args.length !== 2) {
                        console.error('Incorrect amount of arguments');
                        return new Error('Incorrect amount of arguments');
                    }

                    let reference = args[0].toLowerCase();
                    let index = Number(args[1]);

                    for (let i = 0; i < this.board[reference].length; i++) {

                        let item = this.board[reference].items[i];

                        if (item.index === index) {
                            item.mark();
                            return;
                        }

                    }
                }
            },
            rm: {
                execute: (...args) => {
                    if (args.length !== 2) {
                        console.error('Incorrect amount of arguments');
                        return new Error('Incorrect amount of arguments');
                    }

                    let reference = args[0].toLowerCase();
                    let input = Number(args[1]);

                    this.board[reference].purgeItem(input);
                }
            },
            up: {
                execute: (...args) => {
                    if (args.length !== 3) {
                        console.error('Incorrect amount of arguments');
                        return new Error('Incorrect amount of arguments');
                    }

                    let reference = args[0];
                    let referenceIndex = Number(args[1]);
                    let count = Number(args[2]);

                    this.board[reference].up(referenceIndex, count);
                }
            },
            down: {
                execute: (...args) => {
                    if (args.length !== 3) {
                        console.error('Incorrect amount of arguments');
                        return new Error('Incorrect amount of arguments');
                    }

                    let reference = args[0];
                    let referenceIndex = Number(args[1]);
                    let count = Number(args[2]);

                    this.board[reference].down(referenceIndex, count);
                }
            },
            undo: {
              execute: (...args) => {
                if (args.length !== 1) {
                    console.error('Expecting List Name');
                    return new Error('Expecting List Name');
                }

                let reference = args[0].toLowerCase();

                this.board[reference].undo();
              }
            },
            sort: {
                execute: (...args) => {
                    if (args.length !== 2) {
                        console.error('Expecting List Name and acsending or decsending argument');
                        return new Error('Expecting List Name and acsending or decsending argument');
                    }

                    let reference = args[0].toLowerCase();
                    let sortBy = args[1];

                    this.board[reference].sortByDeadline(sortBy);
                }
            },
            priority: {
                execute: (...args) => {
                    if (args.length !== 1) {
                        console.error('Expecting List Name');
                        return new Error('Expecting List Name');
                    }

                    let reference = args[0];

                    this.board[reference].printPriority();
                }
            },
            printItem: {
                execute: (...args) => {
                    if (args.length !== 2) {
                        console.error('');
                        return new Error('');
                    }

                    let reference = args[0].toLowerCase();
                    let index = Number(args[1]);

                    this.board[reference].printFullItem(index);
                }
            },
            quit: {
                exit: false,
                execute: (...args) => {
                    if (args.length !== 0) {
                        console.error('Arguments is not needed');
                        return new Error('Arguments is not needed');
                    }

                    this.allCommands.quit.exit = true;
                }
            }
        }
    }

    async getCommand() {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });


        return await new Promise((resolve) => {

            const askInput = () => {

                rl.question(('Enter a command: '), (inputs) => {
                    let commands = inputs.split(" ");
                    let cmd = commands[0];
                    let args;

                    if (commands.length > 1) {
                        args = commands.slice(1);
                    }

                    // check for inclusion
                    if (this.allCommands[cmd] === undefined) {
                        console.error('Input is not a valid command');
                        rl.close();
                        resolve(new Error('Input is not a valid command'));
                    }

                    // command is valid
                    if (args) {
                        this.allCommands[cmd].execute(...args);
                    } else {
                        this.allCommands[cmd].execute();
                    }
                    rl.close();
                    resolve();
                });

            }

            askInput();
        });

    }

}

const todo = new TodoBoard();

async function test() {

    while(!todo.allCommands.quit.exit) {
        await todo.getCommand();
    };

}

test();

module.exports = TodoBoard;
