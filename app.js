const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOption = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};
const bodyOption = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
};
//Validating input
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOption,
        body: bodyOption
    })
    .command('list', 'List all notes')
    .command('remove', 'Remove a note', {
        title: titleOption
    })
    .command('read', 'Read a note', {
        title: titleOption
    })
    .command('edit', 'Edit a note', {
        title: titleOption,
        body: bodyOption
    })
    .help()
    .argv;
let command = argv._[0];

if (command === 'add') {
    let note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log('Title already exists')
    }
} else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes.`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if (note) {
        console.log('Note read');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    let noteRemove = notes.removeNote(argv.title);
    let message = noteRemove ? 'Note was removed' : 'Note not found';
    console.log(message);
} else if (command === 'edit') {
    let noteRemove = notes.removeNote(argv.title);
    noteRemove ? addNote = notes.addNote(argv.title, argv.body) : addNote = undefined;
    if (addNote) {
        console.log('Note edited');
        notes.logNote(addNote);
    } else {
        console.log('Note not found');
    }
} else {
    console.log("command can't be recognized");
}