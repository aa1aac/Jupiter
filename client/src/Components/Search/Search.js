import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import "./Search.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const searchClick = async () => {
    if (search.trim()) {
      let res = await axios.post("/api/user/search", { search: search.trim() });

      console.log(res.data);

      setSearchResult(res.data.users);
    } else {
      toast.info("search cannot be empty ");
    }
  };

  return (
    <div>
      <h4>Search</h4>

      <label>
        <input
          type="text"
          placeholder="search users"
          className="searchBar"
          value={search}
          onChange={e => setSearch(e.target.value)}
          required
        />
      </label>

      <button className="share" onClick={searchClick}>
        {" "}
        Search
        <i className="material-icons">search</i>
      </button>

      {!searchResult.length ? (
        <h5> No Search Results </h5>
      ) : (
        <div>
          <h5>Search Results</h5>
          {searchResult.map((user, index) => {
            return (
              <div className="followerBox" key={index}>
                <h5>
                  {" "}
                  {user.first_name} {user.last_name}
                </h5>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
