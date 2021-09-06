import React, { useState } from "react";
import { ButtonGroup, Card, Col, Container, Row, ToggleButton } from "react-bootstrap";
import ProjectList from "../../components/projectList";

const ProjectsPage: React.FC = () => {
    const filterOptions = [
        { name: "all", label: "All", value: 0 },
        { name: "pending", label: "Pending", value: 1 },
        { name: "done", label: "Done", value: 2 },
    ];
    const [ filter, setFilter ] = useState(0);

    return (
        <Container fluid style={{ marginTop: "25px" }}>
            <Row className={"align-items-center justify-content-center"}>
                <Col sm={11} md={10}>
                    <Card style={{ minHeight: "500px" }}>
                        <Card.Header className={"card-custom-header"}>Projects</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                List of projects
                            </Card.Title>
                            <Card.Subtitle>
                                <Container className={"d-flex align-items-end justify-content-end"}>
                                    Filter &nbsp;
                                    <ButtonGroup size={"sm"}>
                                        {filterOptions.map((el, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`radio-${el.name}`}
                                                type="radio"
                                                variant="secondary"
                                                name="radio"
                                                value={el.value}
                                                checked={filter === el.value}
                                                onChange={(e) => setFilter(parseInt(e.currentTarget.value))}
                                            >
                                                {el.label}
                                            </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                </Container>
                            </Card.Subtitle>
                            <ProjectList/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
        ;
}

export default ProjectsPage;