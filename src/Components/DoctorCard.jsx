import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-info">
        <div className="image-container">
          <img
            src={doctor.photo}
            onError={(e) => {
              e.target.src = 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png';
            }}
            alt={`Dr. ${doctor.doctorName}`}
            className="doctor-image"
            loading="lazy"
          />
        </div>
        <div className="doctor-details">
          <h3 className="doctor-name">{doctor.doctorName}</h3>
          <p className="doctor-speciality">{doctor.specialization}</p>
          <p className="doctor-qualification">{doctor.qualification}</p>
          <p className="doctor-experience">{doctor.yearsOfExperience} Years Experience</p>
          <p className="doctor-location">
            <span className="clinic-name">{doctor.clinicName}</span>
            <span className="location"> • {doctor.location}</span>
          </p>
          <p className="languages">Speaks: {doctor.languages?.join(', ')}</p>
        </div>
      </div>
      <div className="booking-info">
        <span className="fees">₹ {doctor.consultationFee}</span>
        <button className="book-btn">Book Appointment</button>
      </div>
    </div>
  );
};

export default DoctorCard;
