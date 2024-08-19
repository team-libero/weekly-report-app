import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import EmployeeTable from '../tables/EmployeeTable';
import EmployeeAddEditModal from '../modals/EmployeeAddEditModal';

class EmployeeListPage extends Component {
  state = {
    items: [],
    maxEmpId: 0
  }

  getItems() {
    fetch(`${process.env.REACT_APP_API_ROOT}/employee/get`)
      .then(response => response.json())
      .then(items => this.setState({ items: items }))
      .catch(err => console.log(err))
  };

  getMaxEmpId() {
    fetch(`${process.env.REACT_APP_API_ROOT}/employee/getMaxEmpId`)
      .then(response => response.json())
      .then(item => this.setState({ maxEmpId: Number(item.emp_id) }))
      .catch(err => console.log(err))
  };

  addItemToState = (item) => {
    window.location.reload();
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }));
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.emp_id === item.emp_id);

    this.setState({ items: [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1)
    ] });
  }

  deleteItemFromState = (emp_id) => {
    const newItems = this.state.items.filter(item => item.emp_id !== emp_id)
    this.setState({ items: newItems });
  }

  componentDidMount() {
    this.getItems();
    this.getMaxEmpId();
  }

  render() {
    return (
      <Container className="EmployeeList">
        <Row>
          <Col>
            <h2 style={{ margin: "13px" }}>社員一覧</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <EmployeeTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <EmployeeAddEditModal mode="追加" addItemToState={this.addItemToState} maxEmpId={this.state.maxEmpId} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EmployeeListPage;
