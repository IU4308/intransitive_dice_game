import CliTable3 from 'cli-table3';
import chalk from 'chalk';
import Probabilities from '../models/Probabilities.js';

class Table {
    constructor(diceConfig) {
        this.arguments = diceConfig.arguments;
        this.winningChance = new Probabilities(diceConfig.dice)
        thiss.totalWidth = 100;
        this.columnWidth = Math.floor(this.totalWidth / (this.arguments.length + 1));

        const colWidths = Array(this.arguments.length + 1).fill(this.columnWidth);

        this.table = new CliTable3({
            head: ['User dice v', ...this.arguments.map(arg => chalk.white(arg))],
            colWidths: colWidths,
            style: {
                head: [],
                border: [],
            },
        });

        this.winningChance.forEach((row, i) => {
            row.unshift(this.arguments[i]);
        });

        this.rows = this.winningChance;
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