import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown,Modal } from '@themesberg/react-bootstrap';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from "../config";

import { TransactionsTable } from "../components/Tables";

export default () => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    defaultPrice: "",
    currency: "LKR", // default hidden value
    defaultCapacity: "",
  });

  // update state when inputs change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const response = await fetch(`${API_BASE_URL}/events/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Event created successfully!");
        handleClose();
      } else {
        alert("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">

        <Button variant="primary" className="my-3" onClick={() => setShowDefault(true)}>Default</Button>

        <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title className="h6">Add Event</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  required
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a title.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  required
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a description.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="defaultPrice"
                  required
                  type="number"
                  step="0.01"
                  value={formData.defaultPrice}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a price.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  name="defaultCapacity"
                  required
                  type="number"
                  step="0.01"
                  value={formData.defaultCapacity}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please enter a capacity per event.</Form.Control.Feedback>
              </Form.Group>

              {/* Hidden Currency Field */}
              <Form.Control
                type="hidden"
                name="currency"
                value={formData.currency}
              />

              <Button type="submit" variant="secondary">
                Submit
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm">Export</Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <TransactionsTable />
    </>
  );
};
