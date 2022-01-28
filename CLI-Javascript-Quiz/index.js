#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const timer = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const welcomeTitle = chalkAnimation.rainbow(
    "This is a Javascript quiz game, 10 questions total! Let's do it!\n"
  );

  await timer();
  welcomeTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  gameStart(answers.player_name);
}

async function gameStart(name) {
  playerName = name;
  console.log("Cool name! Cool name! Let's begin! \n");
}

async function handleAnswer(isCorrect, explanation) {
  const spinner = createSpinner("Checking answer...").start();
  await timer();

  if (isCorrect) {
    spinner.success({
      text: `😎 😎 Nice work ${playerName}. That's a legit answer`,
    });
    console.log(explanation + "\n");
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    console.log(explanation + "\n");
    process.exit(1);
  }
}

function winner() {
  //   console.clear();
  figlet(
    `Congrats , ${playerName} !\nYou get\n $ 1 , 0 0 0 , 0 0 0`,
    (err, data) => {
      console.log(gradient.pastel.multiline(data) + "\n");

      process.exit(0);
    }
  );
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Which built-in method returns the length of the string?\n",
    choices: ["length()", "size()", "index()", "None of the above."],
  });

  const explanation = "length() method returns the length of the string.\n";

  return handleAnswer(answers.question_1 === "length()", explanation);
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message:
      "All user-defined objects and built-in objects are descendants of an object called Object?\n",
    choices: ["true", "false"],
  });

  const explanation =
    "All user-defined objects and built-in objects are descendants of an object called Object.\n";
  return handleAnswer(answers.question_2 === "true", explanation);
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: `Which of the following function of Boolean object returns a string of either\n 'true' or 'false' depending upon the value of the object?\n`,
    choices: ["toSource()", "valueOf()", "toString()", "None of the above."],
  });
  const explanation =
    "toString() − Returns a string of either 'true' or 'false' depending upon the value of the object.\n";
  return handleAnswer(answers.question_3 === "toString()", explanation);
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message:
      "Which of the following function of String object returns the calling \nstring value converted to lower case?\n",
    choices: [
      "toLocaleLowerCase()",
      "toLowerCase()",
      "toString()",
      "substring()",
    ],
  });
  const explanation =
    "toLowerCase() − Returns the calling string value converted to lower case.\n";
  return handleAnswer(answers.question_4 === "toLowerCase()", explanation);
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message:
      "Which of the following function of Array object returns a new array\n" +
      "comprised of this array joined with other array(s) and/or value(s)?\n",
    choices: ["concat()", "pop()", "push()", "some()"],
  });
  const explanation =
    "concat() − Returns a new array comprised of this array joined with other array(s) and/or value(s).\n";
  return handleAnswer(answers.question_5 === "concat()", explanation);
}

async function question6() {
  const answers = await inquirer.prompt({
    name: "question_6",
    type: "list",
    message:
      "Which of the following function of Array object extracts \n" +
      "a section of an array and returns a new array?\n",
    choices: ["reverse()", "shift()", "slice()", "some()"],
  });
  const explanation =
    "slice() − Extracts a section of an array and returns a new array.\n";
  return handleAnswer(answers.question_6 === "slice()", explanation);
}

async function question7() {
  const answers = await inquirer.prompt({
    name: "question_7",
    type: "list",
    message:
      "Which one of the following also known as Conditional Expression:\n",
    choices: [
      "Alternative to if-else",
      "Switch statement",
      "If-then-else statement",
      "immediate if",
    ],
  });
  const explanation =
    "A conditional expression can only evaluate two things, which either\n" +
    "true or false, that are purely based on the evaluation of the condition.\n";
  return handleAnswer(answers.question_7 === "immediate if", explanation);
}

async function question8() {
  const answers = await inquirer.prompt({
    name: "question_8",
    type: "list",
    message: `The "function" and " var" are known as:\n`,
    choices: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
  });
  const explanation = `The "function" and "var" both are the Declaration statements. These both\n
     are used for defining, and declaring variable, function in anywhere in the program.\n`;
  return handleAnswer(
    answers.question_8 === "Declaration statements",
    explanation
  );
}

async function question9() {
  const answers = await inquirer.prompt({
    name: "question_9",
    type: "list",
    message:
      "Which of the following variables takes precedence over the others if the names are the same?\n",
    choices: [
      "Global variable",
      "The local element",
      "The two of the above",
      "None of the above",
    ],
  });
  const explanation =
    "In JavaScript, the local variable takes precedence over the \n" +
    "global variable if the name of both local and global variables is the same.\n";
  return handleAnswer(answers.question_9 === "The local element", explanation);
}

async function question10() {
  const answers = await inquirer.prompt({
    name: "question_10",
    type: "list",
    message: `Choose the correct snippet from the following to check if \nthe variable "a" is not equal the "NULL":\n`,
    choices: ["if(a!==null)", "if (a!)", "if(a!null)", "if(a!=null)"],
  });
  const explanation = `The "==" is only true if the type and the content of both operands are the same. The "==" is \nalso one of the common abstracts used for comparing two operands to check whether they are \nequal or not but it will notcheck the data type of the variables. \nSo, the "! ==" operator is known as "non-equal", which is used in our case, \nto compare 0 to NULL. It obtains the output either as true or false that totally\n depends on the given conditions.\n`;
  return handleAnswer(answers.question_10 === "if(a!==null)", explanation);
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
winner();
