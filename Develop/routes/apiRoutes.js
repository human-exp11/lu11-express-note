const router = require('express').Router();
const log = require('../db/db.json');
const path = require('path');
const id = require('uniqid'); 



// getting logged notes
router.get('/notes', (req, res) => {
    log
        .getNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


//posting notes
router.post("/api/notes", (req, res) => {
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
    fs.writeFileSync('./db/db.json',JSON.stringify(newNote), (err, data) => {
      if (err) throw err;
      res.json(newNote)      
    }); 
    // send the new added note/response back to the client
    res.sendFile(path.join(__dirname,'public/notes.html'));
});


// to delete previous logged notes
router.delete('/notes/:id', (req, res) => {
    log
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})

module.exports = router;