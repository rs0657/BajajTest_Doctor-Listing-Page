export const getDoctors = async () => {
  try {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    const data = await response.json();
    
    return data.map(doctor => ({
      id: doctor.id,
      doctorName: doctor.name,
      qualification: doctor.doctor_introduction?.split(',')?.[1]?.trim() || '',
      specialization: doctor.specialities?.[0]?.name || '',
      yearsOfExperience: parseInt(doctor.experience?.split(' ')?.[0]) || 0,
      consultationFee: parseInt(doctor.fees?.replace('₹', '').trim()) || 0,
      clinicName: doctor.clinic?.name || '',
      location: `${doctor.clinic?.address?.locality}, ${doctor.clinic?.address?.city}`,
      consultationMode: doctor.video_consult ? 'online' : 'offline',
      photo: doctor.photo,
      languages: doctor.languages || [],
      clinicAddress: doctor.clinic?.address?.address_line1 || '',
      introduction: doctor.doctor_introduction
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};
