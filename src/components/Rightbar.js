import React from "react";
import "./Rightbar.css";
import { MdSearch } from "react-icons/md";
import trends from "../config/Trends";
const Rightbar = () => {
   
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
  
  return (
    <>
      <div className="rightbarContent">
      
      <MdSearch className="search-icons" size="1.8em" />
      <input
        onChange={""}
        style={styles.search_input}
        type="text"
        placeholder="  search..."
        name="searchText"
        
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

export default Rightbar();
