import chalk from "chalk";

const card = function (cardsDrawn) {
  // first line, just background color
  cardsDrawn.forEach((card) => {
    // 10 take one more character space than any other card
    if (card.rank != 10) {
      if (card.color === "black") {
        process.stdout.write(`${chalk.bgWhite("    ")}`);
      } else {
        process.stdout.write(`${chalk.bgRed("    ")}`);
      }
    } else {
      if (card.color === "black") {
        process.stdout.write(`${chalk.bgWhite("     ")}`);
      } else {
        process.stdout.write(`${chalk.bgRed("     ")}`);
      }
    }

    process.stdout.write("  ");
  });
  console.log();

  // second line, background color and text color
  cardsDrawn.forEach((card) => {
    if (card.color === "black") {
      // background color before text on the same line
      process.stdout.write(`${chalk.bgWhite(" ")}`);
      process.stdout.write(
        `${chalk.bgWhite(chalk.black(card.suit + card.rank))}`
      );
      // background color after text on the same line
      process.stdout.write(`${chalk.bgWhite(" ")}`);
    } else {
      process.stdout.write(`${chalk.bgRed(" ")}`);
      process.stdout.write(`${chalk.bgRed(card.suit + card.rank)}`);
      process.stdout.write(`${chalk.bgRed(" ")}`);
    }
    process.stdout.write("  ");
  });
  console.log();

  // third line, just background color
  cardsDrawn.forEach((card) => {
    // 10 take one more character space than any other card
    if (card.rank != 10) {
      if (card.color === "black") {
        process.stdout.write(`${chalk.bgWhite("    ")}`);
      } else {
        process.stdout.write(`${chalk.bgRed("    ")}`);
      }
    } else {
      if (card.color === "black") {
        process.stdout.write(`${chalk.bgWhite("     ")}`);
      } else {
        process.stdout.write(`${chalk.bgRed("     ")}`);
      }
    }
    process.stdout.write("  ");
  });
  console.log();
};

const dealerCard = function (dealerHandDrawn) {};

const firstRow = function (cardsDrawn, hideFirstCard = false) {
  cardsDrawn.forEach((card, i) => {
    if (i === 0 && hideFirstCard) {
      process.stdout.write(`${chalk.bgGreen("    ")}`);
    } else {
      // 10 take one more character space than any other card
      if (card.rank != 10) {
        // if (card.color === "black") {
        //   process.stdout.write(`${chalk.bgWhite("    ")}`);
        // } else {
        //   process.stdout.write(`${chalk.bgRed("    ")}`);
        // }
        process.stdout.write(`${chalk.bgWhite("    ")}`);
      } else {
        // if (card.color === "black") {
        //   process.stdout.write(`${chalk.bgWhite("     ")}`);
        // } else {
        //   process.stdout.write(`${chalk.bgRed("     ")}`);
        // }
        process.stdout.write(`${chalk.bgWhite("     ")}`);
      }
    }
    process.stdout.write("  ");
  });
  console.log();
};

const thirdRow = function (cardsDrawn, hideFirstCard = false) {
  cardsDrawn.forEach((card, i) => {
    if (i === 0 && hideFirstCard) {
      process.stdout.write(`${chalk.bgGreen("    ")}`);
    } else {
      // 10 take one more character space than any other card
      if (card.rank != 10) {
        // if (card.color === "black") {
        //   process.stdout.write(`${chalk.bgWhite("    ")}`);
        // } else {
        //   process.stdout.write(`${chalk.bgRed("    ")}`);
        // }
        process.stdout.write(`${chalk.bgWhite("    ")}`);
      } else {
        // if (card.color === "black") {
        //   process.stdout.write(`${chalk.bgWhite("     ")}`);
        // } else {
        //   process.stdout.write(`${chalk.bgRed("     ")}`);
        // }
        process.stdout.write(`${chalk.bgWhite("     ")}`);
      }
    }
    process.stdout.write("  ");
  });
  console.log();
};

const midRow = function (cardsDrawn, hideFirstCard = false) {
  cardsDrawn.forEach((card, i) => {
    if (i === 0 && hideFirstCard) {
      // background color before text on the same line
      process.stdout.write(`${chalk.bgGreen(" ")}`);
      process.stdout.write(`${chalk.bgGreen(chalk.black("??"))}`);
      // background color after text on the same line
      process.stdout.write(`${chalk.bgGreen(" ")}`);
    } else {
      process.stdout.write(`${chalk.bgWhite(" ")}`);
      if (card.color === "black") {
        // background color before text on the same line
        // process.stdout.write(`${chalk.bgWhite(" ")}`);
        process.stdout.write(
          `${chalk.bgWhite(chalk.black(card.suit + card.rank))}`
        );
        // background color after text on the same line
        // process.stdout.write(`${chalk.bgWhite(" ")}`);
      } else {
        // process.stdout.write(`${chalk.bgRed(" ")}`);
        process.stdout.write(
          `${chalk.bgWhite(chalk.red(card.suit + card.rank))}`
        );
        // process.stdout.write(`${chalk.bgRed(" ")}`);
      }
      process.stdout.write(`${chalk.bgWhite(" ")}`);
    }
    process.stdout.write("  ");
  });
  console.log();
};

const hand = function (cardsDrawn, hideFirstCard) {
  firstRow(cardsDrawn, hideFirstCard);
  midRow(cardsDrawn, hideFirstCard);
  thirdRow(cardsDrawn, hideFirstCard);
};

export default {
  card,
  hand,
};
