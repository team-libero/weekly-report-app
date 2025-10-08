import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import EmployeeTable from '../tables/EmployeeTable';
import { UserContext } from '../contexts/UserContext';
import { TeamContext } from '../contexts/TeamContext';

const EmployeeListPage = () => {

  const { setSelectedTeamId, selectedTeamId } = useContext(TeamContext);

  const [teamList, setTeamList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const { employeeId } = useContext(UserContext);

  useEffect(() => {
    const getItems = () => {
      fetch(`${process.env.REACT_APP_API_ROOT}/employee/get?employeeId=${employeeId}`)
        .then((response) => response.json())
        .then((items) => {
          setTeamList(items.teamList);
          // TeamContextに選択中のteamIdがあればそのチームを初期表示
          const initialTeamId = selectedTeamId || items.teamList[0].teamId;
          const initialTeam = items.teamList.find(team => String(team.teamId) === String(initialTeamId));
          setEmployeeList(initialTeam.employeeList);
          setSelectedTeamId(initialTeamId); // 初期表示時にもセット
        })
        .catch((err) => console.log(err));
    }
    getItems();
  }, [employeeId]);

  const handleTeamChange = (event) => {
    setSelectedTeamId(event.target.value);
    const selectedTeamId = event.target.value;
    const selectedTeam = teamList.find(
      (team) => String(team.teamId) === selectedTeamId
    );
    if (selectedTeam) {
      setEmployeeList(selectedTeam.employeeList);
    }
  };

  return (
    <Container className="EmployeeList">
      <Row>
        <Col>
          <h2 style={{ margin: '13px' }}>社員一覧</h2>
        </Col>
         <Col>
          <thead>
            <tr>
              <th>チーム選択</th>
              <td>
                <select id="teamID" value={selectedTeamId} onChange={handleTeamChange}>
                  {teamList.map((team) => (
                    <option key={team.teamId} value={team.teamId}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
            </td>
            </tr>
          </thead>
      </Col>
      </Row>
      <Row>
        <Col>
          <EmployeeTable items={employeeList} />
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeListPage;
