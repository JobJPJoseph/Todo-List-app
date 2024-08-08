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
                arguments: [],
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
            toggle: {},
            rm: {},
            up: {},
            down: {},
            undo: {},
            sort: {},
            priority: {},
            print: {},
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
