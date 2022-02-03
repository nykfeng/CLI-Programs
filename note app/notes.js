const fs = require("fs");
const chalk = require("chalk");

const add = (title, body) => {
  const notes = load();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    save(notes);
    console.log(chalk.bgGreen.white(" Note added "));
  } else {
    console.log(chalk.bgRed.white(" Note title has been taken! "));
  }
};

const save = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const read = (title) => {
  const notes = load();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(note.title);
    console.log(note.body);
  } else {
    console.log(chalk.bgRed.white(" Notes not found "));
  }
};

const load = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const remove = (title) => {
  const notes = load();
  console.log("Note to be removed", title);

  const restOfNotes = notes.filter((note) => note.title !== title);

  if (restOfNotes.length < notes.length) {
    console.log(console.log(chalk.bgGreen.inverse`Note ${title} was removed`));
  } else {
    console.log(chalk.bgRed.white(`Note ${title} was note found`));
  }

  save(restOfNotes);
};

const list = () => {
  const notes = load();

  notes.forEach((note) => {
    console.log(chalk.bgGreen.white(note.title));
  });
};

module.exports = {
  add,
  save,
  load,
  remove,
  list,
  read,
};
