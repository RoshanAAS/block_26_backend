const express = require("express");
const { NoteModel } = require("../model/note.model");
const { authentication } = require("../middleware/auth.middleware");

const noteRouter = express.Router();

noteRouter.use(authentication);



noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);

    await note.save();

    res.status(200).json({ msg: "new note has been added", note: req.body });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});



noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ userID: req.body.userID });

    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});



noteRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  const useridinUsersDoc = req.body.userID;

  try {
    const note = await NoteModel.findOne({ _id: id });
    const useridinNoteDoc = note.userID;

    if (useridinUsersDoc === useridinNoteDoc) {
      await NoteModel.findByIdAndUpdate({ _id: id }, req.body);

      res.status(200).json({ msg: `${note.title} has been updated` });
    } else {
      res.status(200).json({ msg: "not Authorized" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});




noteRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  const useridinUsersDoc = req.body.userID;

  try {
    const note = await NoteModel.findOne({ _id: id });
    const useridinNoteDoc = note.userID;

    if (useridinUsersDoc === useridinNoteDoc) {
      await NoteModel.findOneAndDelete({ _id: id });

      res.status(200).json({ msg: `${note.title} has been Deleted` });
    } else {
      res.status(200).json({ msg: "not Authorized" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { noteRouter };
