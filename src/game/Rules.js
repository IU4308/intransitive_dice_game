class Rules {
    static display() {
        console.log(`\n+--------------------------------------------+`);
        console.log(`|           DICE GAME RULES                  |`);
        console.log(`+--------------------------------------------+\n`);

        console.log(`+-----------------------+`);
        console.log(`|      GAME SETUP       |`);
        console.log(`+-----------------------+`);
        console.log(`1. You and the computer select a dice set.`);
        console.log(`2. Each set has six numbers, for example:`);
        console.log(`   - Set 0: [2, 2, 4, 4, 9, 9]`);
        console.log(`   - Set 1: [6, 8, 1, 1, 8, 6]`);
        console.log(`   - Set 2: [7, 5, 3, 7, 5, 3]\n`);

        console.log(`+------------------------------+`);
        console.log(`|  DETERMINING FIRST MOVE      |`);
        console.log(`+------------------------------+`);
        console.log(`1. The computer secretly picks 0 or 1.`);
        console.log(`2. You guess the number.`);
        console.log(`3. Correct guess: You move first.`);
        console.log(`4. Wrong guess: Computer moves first.\n`);

        console.log(`+--------------------+`);
        console.log(`|   CHOOSING DICE    |`);
        console.log(`+--------------------+`);
        console.log(`- First player selects their dice set.`);
        console.log(`- Second player gets a remaining set.\n`);

        console.log(`+----------------------+`);
        console.log(`|   GAMEPLAY ROUNDS    |`);
        console.log(`+----------------------+`);
        console.log(`1. Throwing player picks a number (0-5).`);
        console.log(`2. Opponent adds their number (0-5).`);
        console.log(`3. Calculate: (Your Number + Computer's Number) % 6.`);
        console.log(`4. Result decides which dice value is thrown.\n`);

        console.log(`+---------+`);
        console.log(`|  TURNS  |`);
        console.log(`+---------+`);
        console.log(`- Players alternate selecting numbers and throwing dice.\n`);

        console.log(`+-------------------------+`);
        console.log(`|  WINNING THE ROUND      |`);
        console.log(`+-------------------------+`);
        console.log(`- Higher dice throw wins the round.`);
        console.log(`- Equal values result in a tie.\n`);

        console.log(`+----------------+`);
        console.log(`| GAME CONTROLS |`);
        console.log(`+----------------+`);
        console.log(`- 'X' - Exit the game.`);
        console.log(`- '?' - Display help information.`);
        console.log(`+--------------------------------------------+\n`);
    }
}

export default Rules
