import React from "react";
import { MdSearch } from "react-icons/md";

const styles = {
  search: {
    padding: "2px",
    backgroundColor: "lightgrey",
    marginBottom: "30px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
  },
  search_input: {
    padding: "none",
    margin: "1 0 0 0",
    borderRadius: "10px",
    backgroundColor: "beige",
    minWidth: "20vw",
  },
};
const Search = () => {
  return (
    <div style={styles.search}>
      <MdSearch className="search-icons" size="1.8em" />
      <input
        onChange={(event) => console.log(event.text)}
        style={styles.search_input}
        type="text"
        placeholder="  search blogs..."
      />
    </div>
  );
};

export default Search();
