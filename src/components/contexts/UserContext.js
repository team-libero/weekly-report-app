import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // ユーザーID
  const [employeeId, setEmployeeId] = useState(null);
  // 役職
  const [role, setRole] = useState(null);
  // 部署ID
  const [department_id, setDepartmentId] = useState(null);
  // 部署
  const [department_name, setDepartmentName] = useState(null);
  // チーム名
  const [team_name, setTeamName] = useState(null);
  // 社員姓
  const [emp_lname, setEmpLname] = useState(null);
  // 社員名
  const [emp_fname, setEmpFname] = useState(null);

  return (
    <UserContext.Provider
      value={{
        employeeId,
        setEmployeeId,
        role,
        setRole,
        department_id,
        setDepartmentId,
        department_name,
        setDepartmentName,
        team_name,
        setTeamName,
        emp_lname,
        setEmpLname,
        emp_fname,
        setEmpFname,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
