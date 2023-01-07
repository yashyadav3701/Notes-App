const express = require('express')
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const user = require('../models/User')
const { body, validationResult } = require('express-validator');


// Route1 : fetch all notes of a user /api/notes/fetchallnotes ----login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error happened");
    }
})

// Route2 : add a note by loged in user /api/notes/addnote --- login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description should by altleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        let { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savenotes = await note.save();
        res.json(savenotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error happened");
    }
})

// Route3: update a note exisiting note /api/notes/updatenote   --Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        let { title, description, tag } = req.body;

        let newNode = {};
        if (title) { newNode.title = title };
        if (description) { newNode.description = description };
        if (tag) { newNode.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNode }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error happened");
    }
})

// Route4: delete a note exisiting note /api/notes/deletenote   --Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({success:"Note deleted SUCCESSFULLY",note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error happened");
    }
})

module.exports = router;