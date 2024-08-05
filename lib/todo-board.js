const List = require('../lib/list');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class TodoBoard {

    constructor() {
        this.board = {};
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
