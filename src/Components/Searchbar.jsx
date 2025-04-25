import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

const SearchBar = ({ doctors }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    setSearchTerm(parsed.search || "");
  }, [location.search]);

  useEffect(() => {
    if (doctors && Array.isArray(doctors)) {
      if (searchTerm) {
        const filtered = doctors.filter((doc) =>
          doc.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 3));
      } else {
        setSuggestions([]);
      }
    }
  }, [searchTerm, doctors]);

  const updateSearchParam = (term) => {
    const currentParams = queryString.parse(location.search);
    const updatedParams = { ...currentParams, search: term };
    navigate(`/?${queryString.stringify(updatedParams, { arrayFormat: "comma" })}`);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    updateSearchParam(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateSearchParam(searchTerm);
    }
  };

  return (
    <div className="search-bar">
      <input
        data-testid="autocomplete-input"
        type="text"
        placeholder="Search doctors, clinics, hospitals, etc."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {searchTerm && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((doctor) => (
            <li
              key={doctor.doctorName}
              onClick={() => handleSuggestionClick(doctor.doctorName)}
            >
              {doctor.doctorName}
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .search-bar {
          position: relative;
          width: 100%;
        }
        
        input {
          width: 100%;
          padding: 12px 20px;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .suggestions-list {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          margin-top: 8px;
          border-radius: 4px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          padding: 8px 0;
          z-index: 10;
        }
        
        li {
          padding: 8px 20px;
          cursor: pointer;
          list-style: none;
        }
        
        li:hover {
          background: #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
