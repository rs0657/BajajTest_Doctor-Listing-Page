import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../Components/Header";
import DoctorCard from "../Components/DoctorCard";
import FilterPanel from "../Components/Filterpanel";
import { getDoctors } from "../utils/helpers";

const DoctorListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const fetchedDoctors = await getDoctors();
        console.log('Fetched doctors:', fetchedDoctors); // Debug log
        setDoctors(fetchedDoctors);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  let filteredList = doctors;

  const mode = searchParams.get("mode");
  const sort = searchParams.get("sort");
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const specialityArray = searchParams.getAll("speciality");

  if (mode === "online" || mode === "offline") {
    filteredList = filteredList.filter(doc => doc.consultationMode.toLowerCase() === mode);
  }

  if (specialityArray.length > 0) {
    filteredList = filteredList.filter(doc => specialityArray.includes(doc.specialization));
  }

  if (searchTerm) {
    filteredList = filteredList.filter(doc =>
      doc.doctorName.toLowerCase().includes(searchTerm)
    );
  }

  if (sort === "experience") {
    filteredList = filteredList.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
  } else if (sort === "fees") {
    filteredList = filteredList.sort((a, b) => a.consultationFee - b.consultationFee);
  }

  const handleSortChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    setSearchParams(newParams);
  };

  return (
    <>
      <Header doctors={doctors} />
      <div className="doctor-list-page">
        <div className="main-content">
          <aside className="filters-panel">
            <FilterPanel />
          </aside>
          <main className="doctors-grid">
            {isLoading ? (
              <div className="loading">Loading doctors...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : filteredList.length === 0 ? (
              <div className="no-results">No doctors found</div>
            ) : (
              filteredList.map((doctor, index) => (
                <DoctorCard key={doctor.id || index} doctor={doctor} />
              ))
            )}
          </main>
        </div>
      </div>
      <style jsx>{`
        .doctor-list-page {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .search-container {
          margin-bottom: 20px;
        }
        .main-content {
          display: flex;
          gap: 24px;
        }
        .filters-panel {
          width: 280px;
          background: white;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .sort-section {
          border-bottom: 1px solid #eee;
          padding-bottom: 16px;
          margin-bottom: 16px;
        }
        .sort-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 16px;
        }
        .radio-option {
          display: flex;
          align-items: center;
          padding: 8px 0;
        }
        .radio-option input[type="radio"] {
          margin-right: 12px;
          width: 16px;
          height: 16px;
          accent-color: #2563eb;
        }
        .radio-option label {
          font-size: 14px;
          color: #4b5563;
          cursor: pointer;
        }
        .doctors-grid {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .loading, .error, .no-results {
          padding: 20px;
          text-align: center;
          color: #666;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .error {
          color: #ef4444;
        }
      `}</style>
    </>
  );
};

export default DoctorListPage;
