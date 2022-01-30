import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

import Card from "./Card.js";
import Deck from "./deck.js";
import Blackjack from "./Blackjack.js";

// const jack = new Card("♠", "J");
// console.log(jack.color);

// console.log(jack.card);

const deck = new Deck();

console.log(`let's draw a card`);
console.log(deck.drawACard());
// console.log(deck.cards);
console.log(deck.cards.length);

const bj = new Blackjack();

await bj.startGame();
await bj.makeBet();

// console.log("♠", "♥", "♣", "♦");
// console.log(`${chalk.bgWhite("    ")}`);
// console.log(`${chalk.bgWhite(chalk.black(" ♠K "))}`);
// console.log(`${chalk.bgWhite("    ")}`);

// console.log(`${chalk.bgRed("    ")}`);
// console.log(`${chalk.bgRed(" ♥A ")}`);
// console.log(`${chalk.bgRed("    ")}`);

// const arr = [31, 59, 5, 11, 34, 321, 532, 324, 8, 102];

// console.log(arr);

// console.log(arr.pop());

// console.log(arr);
