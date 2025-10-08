import React, { createContext, useState } from 'react';
export const TeamContext = createContext();
export const TeamProvider = ({ children }) => {
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  return (
    <TeamContext.Provider value={{ selectedTeamId, setSelectedTeamId, selectedEmployeeId, setSelectedEmployeeId }}>
      {children}
    </TeamContext.Provider>
  );
};