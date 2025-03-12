import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // ユーザーID
  const [employeeId, setEmployeeId] = useState(null);
  // 役職
  const [role, setRole] = useState(null);
  // 社員名
  const [employeeName, setEmployeeName] = useState(null);

  return (
    <UserContext.Provider
      value={{
        employeeId,
        setEmployeeId,
        role,
        setRole,
        employeeName,
        setEmployeeName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
