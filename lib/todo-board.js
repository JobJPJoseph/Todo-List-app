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
                execute: (input) => {
                    let subInput = input.toLowerCase();
                    if (this.board[subInput] !== undefined) {
                        console.error(`${input} is already included in the list.`);
                        return new Error(`${input} is already included in the list.`);
                    }
                    this.board[subInput] = new List(input);
                }
            },
            ls: {},
            showall: {},
            mktodo: {},
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
