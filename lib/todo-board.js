const List = require('../lib/list');
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

class TodoBoard {

    constructor() {
        this.board = {};
        this.allCommands = {
            mklist: {
                arguments: [],
                execute: (...input) => {

                    if (input.length !== 1) {
                        console.error('Too many arguments');
                        return new Error('Too many arguments')
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
                execute: () => {
                    console.log(Object.keys(this.board));
                }
            },
            showall: {
                execute: (...args) => {
                    if (args) {
                        console.error('No arguments needed');
                        return new Error('No arguments needed');
                    }
                    for (let pair in this.board) {
                        console.log(this.board[pair].printBoard());
                    }
                }
            },
            mktodo: {
                execute: (...args) => {
                    if (args.length !== 4) {
                        console.error('Incorrect amount of arguments');
                        return new Error('Incorrect amount of arguments');
                    }

                    let reference = args[0];
                    let inputs = args.slice(1);

                    this.board[reference.toLowerCase()].addItem(...inputs);
                }
            },
            toggle: {
                execute: (...args) => {
                    if (args.length !== 2) {
                        console.error('Incorrect amount of arguments');
                        return new Error('Incorrect amount of arguments');
                    }

                    let reference = args[0];
                    let input = args[1];

                    for (let i = 0; i < this.board[reference.toLowerCase()].items.length; i++) {

                        if (typeof this.board[reference.toLowerCase()].items[i] === 'object' ) {
                            let item = this.board[reference.toLowerCase()].items[i];

                            if (item.title === input) {
                                item.mark();
                                return;
                            }

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
                    let input = args[1];

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
                    let referenceIndex = args[1];
                    let count = args[2];

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
                    let referenceIndex = args[1];
                    let count = args[2];

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
                    let index = args[1];

                    this.board[reference].printFullItem(index);
                }
            },
            print: {
                execute: (...args) => {
                    if (args.length !== 1) {
                        console.error('');
                        return new Error('');
                    }

                    for (let list in this.board) {
                        list.printBoard();
                    }
                }
            },
            quit: {}
        }
    }

    async getCommand() {

        return await new Promise((resolve) => {

            const askInput = () => {

                rl.question(('Enter a command: '), (input) => {
                    rl.close();
                    resolve(input);
                });

            }

            askInput();
        });

    }

}

module.exports = TodoBoard;
