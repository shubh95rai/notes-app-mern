import { useNavigate } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { removeToken } from "../utils/auth";

export default function Navbar({
  userInfo,
  onSearchNotes,
  handleClearSearch,
  isSearch,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  function onLogout() {
    removeToken();
    navigate("/login");
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery) {
      onSearchNotes(searchQuery);
    }
  }

  function onClearSearch() {
    setSearchQuery("");
    handleClearSearch();
  }

  useEffect(() => {
    if (!searchQuery && isSearch) {
      handleClearSearch();
    }
  }, [searchQuery]);

  return (
    <div className="flex items-center justify-between px-6 py- h-16 shadow bg-white fixed top-0 w-full">
      <h2 className="text-xl font-bold">Notes App</h2>

      {userInfo && (
        <SearchBar
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
    </div>
  );
}
