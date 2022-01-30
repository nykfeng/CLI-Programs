import chalk from "chalk";

const card = function (dealer) {
  // first line, just background color
  dealer.forEach((card) => {
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
  dealer.forEach((card) => {
    if (card.color === "black") {
      process.stdout.write(`${chalk.bgWhite(" ")}`);
      process.stdout.write(
        `${chalk.bgWhite(chalk.black(card.suit + card.rank))}`
      );
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
  dealer.forEach((card) => {
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

const oneCard = function (card) {
  // first line, just background color
  process.stdout.write(`${chalk.bgWhite("    ")}`);
  process.stdout.write("  ");
  console.log();

  // second line, background color and text color
  process.stdout.write(`${chalk.bgWhite(" ")}`);
  process.stdout.write(`${chalk.bgWhite(chalk.black(card.suit + card.rank))}`);
  process.stdout.write(`${chalk.bgWhite(" ")}`);
  process.stdout.write("  ");

  // thid line, just background color
  process.stdout.write(`${chalk.bgWhite("    ")}`);
  process.stdout.write("  ");
  console.log();
};

export default {
  card,
};
