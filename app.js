const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;

var command = argv._[0];


if(command == 'add')
{
  var note = notes.addNote(argv.title, argv.body);
  if(note == undefined)
  {
    console.log('This Title already exists');
  }
  else
  {
    console.log('Note added Successfully');
    notes.logNote(note);
  }
}
else if(command == 'list')
{
  var all = notes.getAll();
  console.log(`Printing ${all.length} Notes`);
  all.forEach(function(note){
    notes.logNote(note);
  })
}
else if(command == 'read')
{
  var rnote = notes.getNote(argv.title);
  if(rnote == undefined)
  {
    console.log('Note not found');
  }
  else
  {
    console.log('Note Found');
    notes.logNote(rnote);
  }
}
else if(command == 'remove')
{
  var removedNote = notes.removeNote(argv.title);
  if(removedNote == true)
  {
    console.log('Note removed successfully');
  }
  else
  {
    console.log('Note was not removed');
  }
}
else
{
  console.log('Command not found');
}
