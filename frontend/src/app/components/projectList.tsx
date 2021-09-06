import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { totalProjectsSelector } from "../store/features/project";
import { fetchAllProjects } from "../store/features/project/thunks";
import { Alert, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";


const ProjectList: React.FC = () => {
    const dispatch = useAppDispatch();
    const totalProjects = useAppSelector(totalProjectsSelector);
    const { items, status, error } = useAppSelector((state) => state.projects);
    useEffect(() => {
        if ( status === "idle" ) {
            dispatch(fetchAllProjects());
        }
    }, [ status, dispatch ]);

    let content;
    if ( status === "pending" ) {
        content = <Spinner animation="border" variant="info" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    } else if ( status === "succeeded" ) {
        content = <ListGroup style={{ marginTop: "20px" }}>
            {
                items.map((el, idx) => (
                    <ListGroup.Item key={`proj${idx}`}>
                        {el._id} {el.name}
                    </ListGroup.Item>
                ))
            }
        </ListGroup>;
    } else if ( status === "failed" ) {
        content = <Alert variant={"danger"}>{error!.message}</Alert>
    }

    return <Container fluid>
        <Row className={"justify-content-center align-items-center"}>
            <Col>Total number of Projects: {status !== "idle" && totalProjects}</Col>
        </Row>
        <Row className={"justify-content-center align-items-center"}>
            <Col>
                {content}
            </Col>
        </Row>
    </Container>;
}


export default ProjectList;