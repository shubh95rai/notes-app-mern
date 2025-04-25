import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function SearchBar({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}) {
  return (
    <form
      onSubmit={handleSearch}
      className="w-80 bg-slate-100 rounded-lg  items-center px-4 sm:flex hidden"
    >
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full outline-none py-[11px] text-sm bg-transparent"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="mr-3 text-slate-400 hover:text-black cursor-pointer text-xl flex-none"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        onClick={handleSearch}
        className=" text-slate-400 hover:text-black   cursor-pointer flex-none"
      />
    </form>
  );
}
