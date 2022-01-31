import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

import Deck from "./deck.js";
import ask from "./ask.js";
import Card from "./card.js";
import print from "./print.js";
import timer from "./timer.js";
import helper from "./helper.js";

export default class Blackjack {
  #balance;
  #playerName;
  #playerHand = [];
  #dealerHand = [];
  #deck;

  set balance(bal) {
    this.#balance = bal;
  }

  get balance() {
    return this.#balance;
  }

  async timer(ms = 2000) {
    return new Promise((r) => setTimeout(r, ms));
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
    this.#playerName = await ask.askName();
    const balance = await ask.startingBalance();
    if (parseFloat(balance) > 0) {
      this.#balance = parseFloat(balance);
      console.log(`Hi ${this.#playerName}`);
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
      //   console.log("amount is ", amount);
    } while (await this.isNotValid(amount));

    // await this.makeStartingHands();
  }

  async betValidation() {
    console.log("Make another bet?");
    const ans = await ask.yesOrNo();
    if (ans === "no" || ans === "n") {
      console.log("Aye. See ya!");
      process.exit(0);
    } else if (ans === "yes" || ans === "y") {
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
      console.log("👍 That is a legit bet!");
      return false;
    }
  }

  async makeStartingHands() {
    const spinner = createSpinner("Shuffling Cards...").start();
    await timer.loader();

    this.#deck = new Deck();

    if (this.#deck) {
      spinner.success({
        text: `😎 Alright ${this.#playerName}, cards are all set!\n`,
      });
    }

    // At the beginning, player and dealer both draw 2 cards
    this.#playerHand.push(this.#deck.drawACard());
    this.#playerHand.push(this.#deck.drawACard());
    this.#dealerHand.push(this.#deck.drawACard());
    this.#dealerHand.push(this.#deck.drawACard());

    // Show the hands at the start, two cards each
    console.log("Dealer hand");
    // second argument is whether to fold the first card
    // Since one of dealer's card will be folded until it has to reveal
    print.hand(this.#dealerHand, true);
    console.log("----------");

    console.log("Your hand");
    print.hand(this.#playerHand);
    console.log();
  }

  async game() {
    await this.startGame();
    await this.makeBet();
    await this.makeStartingHands();
    await this.gameState();
  }

  async gameState() {
    while (
      this.#playerHand.length != 5 ||
      this.calculate(this.#playerHand) < 21
    ) {
      if (await this.drawPrompt()) {
        this.#playerHand.push(this.#deck.drawACard());
        this.showHands();
        if (this.calculate(this.#playerHand) > 21) {
          await this.finishGame();
          break;
        }
        if (
          this.#playerHand.length === 5 &&
          this.calculate(this.#playerHand) <= 21
        ) {
          await this.finishGame();
          break;
        }
      } else {
        this.dealerPlay();
        await this.finishGame();
        break;
      }
    }
  }

  calculate(handOfCards) {
    let sum = 0;
    let hasA = 0;

    for (let i = 0; i < handOfCards.length; i++) {
      if (helper.convertRank(handOfCards[i].rank) === 1) {
        hasA++;
      }
      sum += helper.convertRank(handOfCards[i].rank);
    }

    if (hasA > 0) {
      if (21 - (sum + 10) >= 0 && 21 - (sum + 10) < 21 - sum) return sum + 10;
    }
    // console.log("sum is ", sum);
    return sum;
  }

  async drawPrompt() {
    console.log("👀 Would you like to draw another card? 💰");
    const answer = await ask.yesOrNo();
    if (answer === "yes" || answer === "y") {
      return true;
    } else if (answer === "no" || answer === "n") {
      return false;
    } else {
      console.log(
        `😔 I am just a program, I can only take yes or no as an answer.`
      );
      await this.drawPrompt();
    }
  }

  dealerPlay() {
    while (
      this.calculate(this.#dealerHand) < 18 &&
      this.#dealerHand.length < 5 &&
      this.calculate(this.#dealerHand) <= this.calculate(this.#playerHand)
    ) {
      this.#dealerHand.push(this.#deck.drawACard());
    }
  }

  async finishGame() {
    this.showHands(false);

    const spinner = createSpinner("Checking for who wins...").start();
    await timer.loader();
    const who = this.whoWins();
    if (who === "player") {
      spinner.success({
        text: `👍 Good work ${this.#playerName}, that was impressive 👏`,
      });
    } else if (who === "dealer") {
      spinner.error({ text: `💀 Lol, that was easy money. Thank you!` });
    } else {
      spinner.stop({ text: ` A draw is a draw!` });
    }
  }

  showHands(fold = true) {
    // console.clear();

    console.log();
    console.log("Dealer hand");
    // second argument is whether to fold the first card
    // Since one of dealer's card will be folded until it has to reveal
    print.hand(this.#dealerHand, fold);
    this.#dealerHand.forEach(() => {
      process.stdout.write("------");
    });

    console.log();

    console.log("Your hand");
    print.hand(this.#playerHand);
    console.log();
  }

  whoWins() {
    console.log();
    console.log("Dealer has ", this.calculate(this.#dealerHand));
    console.log("You have ", this.calculate(this.#playerHand));

    if (this.calculate(this.#playerHand) > 21) {
      console.log("Dealer wins. ");
      return "dealer";
    } else if (
      this.#playerHand.length === 5 &&
      this.calculate(this.#playerHand) <= 21
    ) {
      console.log("🎉 You win.");
      return "player";
    } else if (
      this.calculate(this.#playerHand) === this.calculate(this.#dealerHand)
    ) {
      console.log("It's a draw. Can you believe it 🤢");
      return "draw";
    } else if (
      this.calculate(this.#playerHand) <= 21 &&
      this.calculate(this.#dealerHand) > 21
    ) {
      console.log("🎉 You win.");
      return "player";
    } else {
      if (this.calculate(this.#playerHand) > this.calculate(this.#dealerHand)) {
        console.log("You win.");
        return "player";
      } else {
        console.log("Dealer wins. ");
        return "dealer";
      }
    }
  }
}
