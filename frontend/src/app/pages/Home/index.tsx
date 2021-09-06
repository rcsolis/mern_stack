import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import ProjectList from "../../components/projectList";
import TaskList from "../../components/taskList";

const HomePage: React.FC = (props) => {

    return (
        <Container fluid style={{ "marginTop": "20px" }}>
            <Row className={"align-items-center justify-content-around"}>
                <Col sm={4}>
                    <Card>
                        <Card.Header className={"card-custom-header"}>
                            <Link to={"/projects"}>
                                Projects
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <ProjectList/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={4}>
                    <Card>
                        <Card.Header>
                            <Link to={"/tasks"}>
                                Tasks
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <TaskList/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;