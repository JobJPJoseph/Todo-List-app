class Item {
    constructor(title, deadline, description) {
        this.title = title;
        this.description = description;
        this.done = false;
        this.deadline = undefined;

        if (Item.isValidDate(deadline)) {
            this.deadline = deadline;
        } else {
            throw new Error("deadline was in an invalid format");
        }
    }

    static isValidDate(deadline) {
        if (typeof deadline !== 'string') return false;

        if (deadline.length !== 10) return false;

        // Needs to be O(1) for shecking dashes
            // 00-00-0000
            // index 2 : 5
        if ((deadline[2] !== "-") && (deadline[5] !== "-")) return false;

        let arrDeadline = deadline.split("-");

        for (let i = 0; i < arrDeadline.length; i++) {
            const strNum = arrDeadline[i];

            try {
                if (!Number.isInteger(Number(strNum))) return false;
            } catch(error) {
                return false;
            }

        }

        return true;
    }

    toggle() {
        if (this.done) {
            this.done = false;
        } else {
            this.done = true;
        }

    }

    mark() {
        if (this.done) {
            this.toggle();
          return `[${String.fromCharCode(10003)}]`;
        } else {
            this.toggle();
          return "[ ]";
        }
    }
}

module.exports = Item;
