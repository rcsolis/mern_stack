import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchAllTasks } from "../store/features/task/thunks";
import { totalTasksSelector } from "../store/features/task";
import { Alert, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";

const TaskList: React.FC = () => {
    const dispatch = useAppDispatch();
    const totalTasks = useAppSelector(totalTasksSelector);
    const { status, items, error } = useAppSelector(
        (state) => state.tasks
    );

    useEffect(() => {
        if ( status === "idle" ) {
            dispatch(fetchAllTasks());
        }
    }, [ status, dispatch ]);

    let content;

    if ( status === "pending" ) {
        content = <Spinner animation="grow" variant="info" role="satus">
            <span className="visually-hidden">Loading ...</span>
        </Spinner>
    } else if ( status === "failed" ) {
        content = <Alert variant="danger">
            {error!.message}
        </Alert>;
    } else if ( status === "succeeded" ) {
        content = <ListGroup style={{ marginTop: "20px" }}>
            {
                items.map((el, idx) => (
                    <ListGroup.Item key={`ask${idx}`}>
                        {el._id} {el.name}
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    }

    return <Container fluid>
        <Row className={"justify-content-center align-items-center"}>
            <Col>Total number of Tasks: {status !== "idle" && totalTasks}</Col>
        </Row>
        <Row className={"justify-content-center align-items-center"}>
            <Col>
                {content}
            </Col>
        </Row>
    </Container>
}

export default TaskList;