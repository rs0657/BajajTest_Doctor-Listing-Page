import React from 'react';
import SearchBar from './Searchbar';
import './Header.css';

const Header = ({ doctors }) => {
  return (
    <div className="header">
      <div className="header-content">
        <div className="search-container">
          <SearchBar doctors={doctors} />
        </div>
      </div>
    </div>
  );
};

export default Header;
