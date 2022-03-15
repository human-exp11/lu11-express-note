const router = require('express').Router();

const path = require('path');
const id = require('uniqid'); 
const fs = require('fs');



// getting logged notes
router.get('/notes', (req, res) => {
    const log = require('../db/db.json');
    res.send(log)
})


//posting notes
router.post("/notes", (req, res) => {
    const note = req.body;
    // unique identifier with uniqid npm
    note.id = id();
    // add to the db.json file
    let noteInfo = fs.readFileSync('./db/db.json');
    // create new note
    let newNote = JSON.parse(noteInfo);
    // push new note to array
    newNote.push(req.body);
    // rrite & stringify new array
    fs.writeFileSync('./db/db.json',JSON.stringify(newNote))
      res.json(newNote)
});


// to delete previous logged notes
router.delete('/notes/:id', (req, res) => {
    try{
    let noteInfo = fs.readFileSync('./db/db.json');
    let newNote = JSON.parse(noteInfo);
    const filteredNotes = newNote.filter((note) => note.id!==req.params.id);
    fs.writeFileSync('./db/db.json',JSON.stringify(filteredNotes));
    res.json(filteredNotes);
    }
    catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router;