import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./db/db.js";
import {
  createAccount,
  getUser,
  login,
} from "./controllers/auth/auth-controller.js";
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
  searchNotes,
  updateNotePinned,
} from "./controllers/note/note-controller.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

dotenv.config();
connectToDB();
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CLIENT_BASE_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// create account
app.post("/create-account", createAccount);

// login
app.post("/login", login);

// get user
app.get("/get-user", authenticateToken, getUser);

// add note
app.post("/add-note", authenticateToken, addNote);

// edit note
app.put("/edit-note/:noteId", authenticateToken, editNote);

// get all notes
app.get("/get-all-notes", authenticateToken, getAllNotes);

// delete note
app.delete("/delete-note/:noteId", authenticateToken, deleteNote);

// update isPinned status
app.put("/update-note-pinned/:noteId", authenticateToken, updateNotePinned);

// search notes
app.get("/search-notes", authenticateToken, searchNotes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
