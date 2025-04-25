import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./FilterPanel.css";

const specialitiesList = [
  "Neurologist",
  "Oncologist",
  "Ayurveda",
  "Homeopath",
  "Cardiologist",
  "Dermatologist",
  "General Physician",
  "Dentist",
  "Paediatrician",
  "Gynaecologist",
  "ENT",
  "Diabetologist",
  "Physiotherapist",
  "Endocrinologist",
  "Orthopaedic",
  "Ophthalmologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Psychiatrist",
  "Urologist",
  "Dietitian/Nutritionist",
  "Psychologist",
  "Sexologist",
  "Nephrologist",
];

const FilterPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSpecialitiesOpen, setIsSpecialitiesOpen] = useState(true);
  const [isModeOpen, setIsModeOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const [specialtySearch, setSpecialtySearch] = useState("");

  const mode = searchParams.get("mode") || "";
  const sort = searchParams.get("sort") || "";
  const selectedSpecialities = searchParams.getAll("speciality");

  const filteredSpecialties = specialitiesList.filter(spec => 
    spec.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  // Toggle multi-select (for specialities checkboxes)
  const toggleArrayParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);

    if (current.includes(value)) {
      const updated = current.filter(item => item !== value);
      params.delete(key);
      updated.forEach(item => params.append(key, item));
    } else {
      params.append(key, value);
    }

    setSearchParams(params);
  };

  const clearAll = () => setSearchParams({});

  return (
    <div className="filter-panel">
      <div className="section">
        <div className="section-header" onClick={() => setIsSortOpen(!isSortOpen)}>
          <h3>Sort by</h3>
          <span className={`arrow ${isSortOpen ? 'open' : ''}`}>▼</span>
        </div>
        {isSortOpen && (
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="sort"
                checked={sort === "fees"}
                onChange={() => updateParam("sort", "fees")}
              />
              <span>Price: Low-High</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sort"
                checked={sort === "experience"}
                onChange={() => updateParam("sort", "experience")}
              />
              <span>Experience- Most Experience first</span>
            </label>
          </div>
        )}
      </div>

      <div className="section">
        <div className="filter-header">
          <h3>Filters</h3>
          <button onClick={clearAll} className="clear-all">Clear All</button>
        </div>
      </div>

      <div className="section">
        <div className="section-header" onClick={() => setIsSpecialitiesOpen(!isSpecialitiesOpen)}>
          <h3>Specialities</h3>
          <span className={`arrow ${isSpecialitiesOpen ? 'open' : ''}`}>▼</span>
        </div>
        {isSpecialitiesOpen && (
          <>
            <input
              type="search"
              placeholder="Search specialities"
              value={specialtySearch}
              onChange={(e) => setSpecialtySearch(e.target.value)}
              className="specialty-search"
            />
            <div className="checkbox-group">
              {filteredSpecialties.map((spec) => (
                <label key={spec} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedSpecialities.includes(spec)}
                    onChange={() => toggleArrayParam("speciality", spec)}
                  />
                  <span>{spec}</span>
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="section">
        <div className="section-header" onClick={() => setIsModeOpen(!isModeOpen)}>
          <h3>Mode of consultation</h3>
          <span className={`arrow ${isModeOpen ? 'open' : ''}`}>▼</span>
        </div>
        {isModeOpen && (
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="mode"
                checked={mode === "online"}
                onChange={() => updateParam("mode", "online")}
              />
              <span>Video Consultation</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="mode"
                checked={mode === "offline"}
                onChange={() => updateParam("mode", "offline")}
              />
              <span>In-clinic Consultation</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="mode"
                checked={!mode}
                onChange={() => updateParam("mode", "")}
              />
              <span>All</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
