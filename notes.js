const fs = require('fs');

var fetchnotes = function()
{
  try{
    var notestring = fs.readFileSync('notes-data.json');
    return JSON.parse(notestring);
  }catch(e){
    return [];
  }
};

var savenotes = function(notes)
{
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNote = function(title, body)
{
  var notes = fetchnotes();
  var note = {
    title: title,
    body: body
  };
  var duplicateNotes = notes.filter(function(note){
    return note.title == title;
  });
  if(duplicateNotes.length == 0)
  {
    notes.push(note);
    savenotes(notes);
    return note;
  }
};

var getAll = function()
{
  return fetchnotes();
};

var getNote = function(title)
{
  var notes = fetchnotes();
  var duplicateNotes = notes.filter(function(note){
    return note.title == title;
  });
  return duplicateNotes[0];
};

var removeNote = function(title)
{
  var notes = fetchnotes();
  var duplicateNotes = notes.filter(function(note){
    return note.title != title;
  });
  savenotes(duplicateNotes);
  return notes.length != duplicateNotes.length;
};

var logNote = function(note)
{
  debugger;
  console.log('--');
  console.log(`Title = ${note.title}`);
  console.log(`Body = ${note.body}`);
}

module.exports = {
  addNote : addNote,
  getAll : getAll,
  getNote: getNote,
  removeNote: removeNote,
  logNote: logNote
};
