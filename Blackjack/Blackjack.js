import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

import Deck from "./deck.js";
import ask from "./ask.js";
import Card from "./card.js";
import print from "./print.js";

export default class Blackjack {
  #balance;
  #playerHand = [];
  #dealerHand = [];
  #deck;

  set balance(bal) {
    this.#balance = bal;
  }

  get balance() {
    return this.#balance;
  }

  async timer(ms = 5000) {
    new Promise((r) => setTimeout(r, ms));
  }

  //   async startGame() {
  //     const spinner = createSpinner("Checking your balance...").start();

  //     setTimeout(() => {
  //       if (this.balance > 0) {
  //         spinner.success({
  //           text: `😎😎 Looks like you've got some money. Let's do it~!`,
  //         });
  //       } else {
  //         spinner.error({ text: `💀💀💀 Lol, you are broke!` });
  //         process.exit(1);
  //       }
  //     }, 2000);
  //   }

  async startGame() {
    const balance = await ask.startingBalance();
    if (parseFloat(balance) > 0) {
      this.#balance = parseFloat(balance);
      console.log("🤑 🤑 Looks like you've got some money. Let's do it~!");
    } else if (parseFloat(balance) <= 0) {
      console.log(`💀💀💀 Lol, you are broke!`);
      process.exit(0);
    } else {
      console.log("Gotta start with legit 💵 U.S. dollars");
      process.exit(0);
    }
  }

  async makeBet() {
    let amount;

    do {
      const answers = await ask.bettingAmount();
      amount = parseFloat(answers);
      console.log("amount is ", amount);
    } while (await this.isNotValid(amount));

    console.log("Done making bet");
    this.dealStartingCards();
  }

  async betValidation() {
    console.log("Make another bet?");
    const ans = await ask.yesOrNo();
    if (ans === "no") {
      console.log("Aye. See ya!");
      process.exit(0);
    } else if (ans === "yes") {
      return;
    } else {
      console.log(
        `😔 I am just a program, I can only take yes or no as an answer.`
      );
      await this.betValidation();
    }
  }

  async isNotValid(amount) {
    if (!parseFloat(amount)) {
      console.log("I may be a program 😒, but I speak human only.");
      return true;
    }
    if (amount > this.#balance) {
      console.log("Uhhh...You might want to check your balance 🙄. Bet lower");

      await this.betValidation();
      return true;
    } else {
      console.log("Within balance limit tho");
      return false;
    }
  }

  dealStartingCards() {
    this.#deck = new Deck();

    // At the beginning, player and dealer both gto draw 2 cards
    this.#playerHand.push(this.#deck.drawACard());
    this.#playerHand.push(this.#deck.drawACard());
    this.#dealerHand.push(this.#deck.drawACard());
    this.#dealerHand.push(this.#deck.drawACard());
    this.#dealerHand.push(this.#deck.drawACard());
    this.#dealerHand.push(this.#deck.drawACard());
    console.log(this.#playerHand);
    console.log(this.#dealerHand);

    print.card(this.#dealerHand);
  }
}
