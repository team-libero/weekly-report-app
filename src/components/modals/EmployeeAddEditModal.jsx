import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import EmployeeForm from '../forms/EmployeeForm';

class EmployeeAddEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
    const mode = this.props.mode;
    const button = <Button
        color={mode === "編集" ? "warning" : "success"}
        onClick={this.toggle}
        style={{ float: "left", marginRight: "13px" }}>{mode}
      </Button>

    return (
      <div>
        {button}
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{mode}</ModalHeader>
          <ModalBody>
            <EmployeeForm
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              item={this.props.item}
              maxEmpId={this.props.maxEmpId} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default EmployeeAddEditModal;
