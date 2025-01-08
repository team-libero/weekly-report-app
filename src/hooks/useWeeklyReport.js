import { useState } from 'react';

export const useWeeklyReport = (employeeId) => {
  const [formData, setFormData] = useState([{}]);
  const handleCopy = async () => {
    const response = await fetch(`/api/report/copy/${employeeId}`);
    const latestReport = await response.json();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    handleCopy,
    handleChange,
  };
};
