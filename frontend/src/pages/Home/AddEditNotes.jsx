import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";
import LoadingButton from "@/components/LoadingButton";

export default function AddEditNotes({ noteData, getAllNotes, type, onClose }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // add note
  async function addNewNote() {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data.success) {
        toast.success("Note added successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An expected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // edit note
  async function editNote() {
    try {
      setIsLoading(true);
      const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
        title,
        content,
        tags,
        isPinned: noteData.isPinned,
      });

      if (response.data.success) {
        toast.success("Note updated successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An expected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleAddNote() {
    if (!title) {
      setError("Please enter a title");
      return;
    }

    if (!content) {
      setError("Please enter content");
      return;
    }

    // if (!tags.length) {
    //   setError("Please add atleast one tag");
    //   return;
    // }

    setError(null);

    if (type === "add") {
      addNewNote();
    } else {
      editNote();
    }
  }
  return (
    <div className="relative">
      <button
        className="size-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl outline-none"
          placeholder="Go to gym at 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea
          className="text-sm bg-slate-50 rounded-lg outline-none p-2"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs mt-3">{error}</p>}

      {/* <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "add" ? "ADD" : "UPDATE"}
      </button> */}

      <div className="mt-2" onClick={handleAddNote}>
        <LoadingButton pending={isLoading}>
          {type === "add" ? "ADD" : "UPDATE"}
        </LoadingButton>
      </div>
    </div>
  );
}
