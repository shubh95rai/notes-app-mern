import Note from "../../models/Note.js";
import mongoose from "mongoose";

export async function addNote(req, res) {
  const { title, content, tags } = req?.body;
  const user = req.user;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }
  if (!content) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user.id,
    });

    await note.save();

    res.status(201).json({
      success: true,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function editNote(req, res) {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const user = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({
      success: false,
      message: "No data to update",
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user.id });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    if (title) {
      note.title = title;
    }

    if (content) {
      note.content = content;
    }

    if (tags) {
      note.tags = tags;
    }

    if (isPinned) {
      note.isPinned = isPinned;
    }

    await note.save();

    res.status(201).json({
      success: true,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getAllNotes(req, res) {
  const user = req.user;
  try {
    const notes = await Note.find({ userId: user.id }).sort({ isPinned: -1 });

    res.status(200).json({
      success: true,
      notes,
      message: "All notes fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
}

export async function deleteNote(req, res) {
  const { noteId } = req.params;
  const user = req.user;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid note ID",
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user.id });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await Note.deleteOne({ _id: noteId, userId: user.id });

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function updateNotePinned(req, res) {
  const { noteId } = req.params;
  const user = req.user;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid note ID",
    });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user.id });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    note.isPinned = !note.isPinned;

    await note.save();

    res.status(201).json({
      success: true,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function searchNotes(req, res) {
  const { query } = req.query;
  const user = req.user;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "No query provided",
    });
  }

  try {
    const matchingNotes = await Note.find({
      userId: user.id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    });

    res.status(200).json({
      success: true,
      notes: matchingNotes,
      message: "Notes matching the search query fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
