import CliTable3 from 'cli-table3';
import chalk from 'chalk';

class Table {
    constructor(args, probabilities) {
        const totalWidth = 100;
        const colWidth = Math.floor(totalWidth / (args.length + 1));
        const colWidths = Array(args.length + 1).fill(colWidth);

        this.table = new CliTable3({
            head: ['User dice v', ...args.map(arg => chalk.white(arg))],
            colWidths: colWidths,
            style: {
                head: [],
                border: [],
            },
        });

        probabilities.forEach((el, i) => {
            el.unshift(args[i]);
        });

        this.rows = probabilities;
        this.rows.forEach(row => {
            const coloredRow = row.map((cell, cellIndex) => {
                if (cellIndex === 0) {
                    return chalk.white(cell);
                } else {
                    return chalk.blue(cell);
                }
            });
            this.table.push(coloredRow);
        });
    }

    toString() {
        return this.table.toString();
    }
}

export default Table;