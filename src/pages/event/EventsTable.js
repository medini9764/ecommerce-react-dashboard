import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { API_BASE_URL } from "../../config";

export function EventsTable() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);
  console.log(events);
    

    return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Title</th>
              <th className="border-bottom">Description</th>
              <th className="border-bottom">Price</th>
              <th className="border-bottom">Capacity</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={`event-${event.id}`}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.defaultPrice}</td>
                <td>{event.defaultCapacity}</td>
                <td>
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle
                      as={Button}
                      split
                      variant="link"
                      className="text-dark m-0 p-0"
                    >
                      <span className="icon icon-sm">
                        <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item className="text-danger">
                        <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>Previous</Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Next>Next</Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{events.length}</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
    );
}