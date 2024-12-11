import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // ユーザーID
  const [employeeId, setEmployeeId] = useState(null);
  // 役職
  const [role, setRole] = useState(null);

  return (
    <UserContext.Provider value={{ employeeId, setEmployeeId, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};
