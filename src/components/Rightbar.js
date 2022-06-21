import React, {useState} from "react";
import "./Rightbar.css";
import { MdSearch } from "react-icons/md";
import trends from "../config/Trends";
const Rightbar = ({handleSearchBlog}) => {
  const [searchText, setSearchText] = useState("");  
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
      backgroundColor: "white",
      minWidth: "15vw",
      height: "25px",
    },
  }; 
  
  function handleSearchBlog() {
    setSearchText(searchText);
  };
  
  return (
    <>
      <div className="rightbarContent">
      
      <MdSearch className="search-icons" size="1.8em" />
      <input
        onChange={(e) => console.log(searchText)}
        style={styles.search_input}
        type="text"
        placeholder="  search..."
      />
        <div className="trends">
          Trending Today?
          {trends.map((e, i) => {
            return (
              <div key={i} className="trend">
                <div className="trendTitle">{e.title}</div>
                <div className="trendText">{e.text}</div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
};

export default Rightbar;
