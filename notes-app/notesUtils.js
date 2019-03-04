const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const notesJSON = dataBuffer.toString();
        return JSON.parse(notesJSON);
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
};

const addNote = (title, body) => {
    var notes = loadNotes();

    const duplicateNote = notes.find(o => o.title === title);
    if(duplicateNote) {
        return console.log(chalk.red.bold('Note title is taken already!'));
    }

    notes.push({
        title,
        body
    });

    saveNotes(notes);

    console.log(chalk.green.bold('New note added!'));
};

const removeNote = (title) => {
    const notes = loadNotes();

    const newNotes = notes.filter(o => o.title !== title);

    saveNotes(newNotes);
    if(notes.length !== newNotes.length) {
        console.log(chalk.green.bold('Note removed!'));
    } else {
        console.log(chalk.red.bold('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.bold('Your notes:'));
    notes.forEach(n => console.log(chalk.cyan(n.title)));
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(n => n.title === title);
    if(!note) {
        return console.log(chalk.bold.red('No note found!'));
    }

    console.log(chalk.cyan.bold(note.title));
    console.log(note.body);
}

module.exports = {
    saveNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
};
