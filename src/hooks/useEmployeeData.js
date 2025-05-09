import { useEffect, useState } from 'react';

export const useEmployeeData = () => {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [salesEmployees, setSalesEmployees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamLeaderResponse, salesEmployeeResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_ROOT}/getTld`),
          fetch(`${process.env.REACT_APP_API_ROOT}/getSalesEmployee`),
        ]);

        const [teamLeadersData, salesEmployeesData] = await Promise.all([
          teamLeaderResponse.json(),
          salesEmployeeResponse.json(),
        ]);

        setTeamLeaders(teamLeadersData);
        setSalesEmployees(salesEmployeesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  return {
    teamLeaders,
    salesEmployees,
  };
};
