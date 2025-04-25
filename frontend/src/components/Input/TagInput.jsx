import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

export default function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e) {
    setInputValue(e.target.value.trim());
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (inputValue) {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  }

  function handleRemoveTag(tagToRemove) {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  return (
    <div className="">
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 items-center">
          {tags.map((tag, index) => {
            return (
              <span
                key={index}
                className="flex items-center gap-2 bg-slate-200 rounded-lg px-3 py-1 text-sm text-slate-900 font-medium"
              >
                # {tag}
                <button>
                  <MdClose
                    onClick={() => {
                      handleRemoveTag(tag);
                    }}
                  />
                </button>
              </span>
            );
          })}
        </div>
      )}
      <form className="flex items-center gap-2 mt-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Tags"
          className="text-sm bg-transparent border px-3 py-2 outline-none rounded-lg w-full max-w-xs"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="size-8 flex items-center justify-center rounded-lg border border-my-primary hover:bg-blue-700 text-my-primary hover:text-white flex-none"
        >
          <MdAdd className="text-xl" />
        </button>
      </form>
    </div>
  );
}
