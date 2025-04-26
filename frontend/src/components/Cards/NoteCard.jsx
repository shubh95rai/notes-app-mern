import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";

export default function NoteCard({
  title,
  date,
  isPinned,
  content,
  tags,
  onEdit,
  onDelete,
  onPinNote,
  noteId,
  updatingNoteId,
}) {
  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-md transition-all ease-in-out duration-300">
      <div className="flex items-start justify-between">
        <div className="">
          <h6 className="text- font-medium">{title}</h6>
          <span className="text-sm text-slate-500">
            {moment(date).format("DD MMM YYYY")}
          </span>
        </div>

        <button onClick={onPinNote} disabled={updatingNoteId === noteId}>
          <MdOutlinePushPin
            className={`icon-btn ${
              isPinned ? "text-my-primary" : "text-slate-300"
            }`}
          />
        </button>
      </div>

      <p className="text-sm text-slate-700 mt-2 line-clamp-2">{content}</p>

      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm text-slate-500">
          {tags.map((tag) => {
            return ` #${tag}`;
          })}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}
