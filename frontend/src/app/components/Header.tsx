import React from "react";
import { Button, ButtonGroup, Col, Container, Nav, Navbar, Row } from "react-bootstrap";

import { GoProject, GoTasklist } from "react-icons/go";

export default class Header extends React.Component<{}> {
    
    render () {
        return (
            <Container fluid className={"header"}>
                <Container fluid>
                    <Row className={"justify-content-center align-items-start"}>
                        <Col>
                            <header>
                                Simple MERN app :: Projects and Tasks ::
                            </header>
                        </Col>
                    </Row>
                </Container>
                <Navbar expand="xxl" variant="dark" className={"navbar-flat"}>
                    <Container>
                        <Navbar.Brand href={"/"}>
                            <img alt={""} src={"https://react-bootstrap.github.io/logo.svg"}
                                 width={32} height={32} className={"d-inline-block align-top"}/>
                            <span>&nbsp;Welcome to the sample app</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="main-page-nav"/>
                        <Navbar.Collapse id="main-page-nav" className={"justify-content-center"}>
                            <Nav.Item>
                                <ButtonGroup aria-label="Menu actions">
                                    <Button variant={"custom-primary"} size="lg">
                                        <GoTasklist/>&nbsp;
                                        Add new Project
                                    </Button>
                                    <Button variant={"custom-secondary"} size="lg">
                                        <GoProject/>&nbsp;
                                        Add new Task

                                    </Button>
                                </ButtonGroup>
                            </Nav.Item>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
        );
    }
}